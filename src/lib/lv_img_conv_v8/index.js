import { convertImageBlob } from "./convert.ts";
import { ImageMode, ImageModeUtil, OutputMode } from "./enums.ts";

import fileSaver from "file-saver";

const tryParsingImageData = (url) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ w: image.width, h: image.height });
    image.onerror = () => resolve(null);
    image.src = url;
  });
};

const imageConvert = async (fileList, colorFormat, outputFormat, dither, bigEndian) => {
  for (var i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (file) {
      const reader = new FileReader();
      await new Promise((resolve, reject) => {
        const outputType = outputFormat;
        let outputMode, binaryFormat;
        const requestedCf = colorFormat;
        if (outputType == "c_array") outputMode = OutputMode.C;
        else {
          outputMode = OutputMode.BIN;
          const needBinaryFormat = ImageModeUtil.isTrueColor(requestedCf);
          if (needBinaryFormat) {
            const binFormatMap = {
              bin_332: ImageMode.ICF_TRUE_COLOR_ARGB8332,
              bin_565: ImageMode.ICF_TRUE_COLOR_ARGB8565,
              bin_565_swap: ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP,
              bin_888: ImageMode.ICF_TRUE_COLOR_ARGB8888,
            };
            binaryFormat = binFormatMap[outputType];
            if (typeof binaryFormat === "undefined") throw new Error("Binary format not found: " + outputType);
          }
        }

        const getDefaultFilename = (filename) => {
          return filename.split(".")[0];
        };

        const doConvert = async (blob, overrideWidth, overrideHeight) => {
          const imageName = getDefaultFilename(file.name);

          const swapEndian = outputMode == OutputMode.C && bigEndian;
          const imageString = await convertImageBlob(blob, {
            cf: requestedCf,
            outName: imageName,
            swapEndian: swapEndian,
            outputFormat: outputMode,
            binaryFormat,
            overrideWidth,
            overrideHeight,
            dith: dither,
          });

          const newBlob = new Blob([imageString], {
            type: outputMode == OutputMode.BIN ? "binary/octet-stream" : "text/x-c;charset=utf-8",
          });

          fileSaver.saveAs(newBlob, imageName + "." + (outputMode == OutputMode.BIN ? "bin" : "c"));

          resolve();
        };

        if (ImageMode[colorFormat].startsWith("CF_RAW")) {
          reader.readAsArrayBuffer(file);
          reader.onload = async function (e) {
            const buf = e.target.result; // ArrayBuffer
            const blobUrl = URL.createObjectURL(new Blob([buf]));
            const overrideInfo = await tryParsingImageData(blobUrl);
            doConvert(new Uint8Array(buf), overrideInfo?.w, overrideInfo?.h);
          };
        } else {
          reader.onload = function (e) {
            var image = new Image();
            image.onload = function () {
              doConvert(image);
            };

            image.onerror = function (e) {
              reject(e);
            };

            image.src = e.target.result;
          };

          reader.readAsDataURL(file);
        }
      });
    }
  }
};

export default imageConvert;
