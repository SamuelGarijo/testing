import convert from "./convert";
import AppError from "./app_error";
import fileSaver from "file-saver";

// this is used to generate the command line arguments for the font converter
const generateOptsString = (args) => {
  const opts = [];

  const generateRange = (start, end, transpose) => {
    if (start !== transpose) {
      return start + "-" + end + "=>" + transpose;
    }
    if (start !== end) {
      return start + "-" + end;
    }
    return start;
  };

  opts.push("--bpp", args.bpp);
  opts.push("--size", args.size);
  if (args.no_compress) {
    opts.push("--no-compress");
  }
  if (args.lcd) {
    opts.push("--lcd");
  }
  if (args.lcd_v) {
    opts.push("--lcd-v");
  }
  if (args.use_color_info) {
    opts.push("--use-color-info");
  }

  for (var i = 0; i < args.font.length; i++) {
    opts.push("--font", args.font[i].source_path);
    const r = args.font[i].ranges;

    let symbols = "";
    const ranges = [];
    for (var j = 0; j < r.length; j++) {
      if (r[j].symbols) {
        symbols += r[j].symbols;
      }
      for (var k = 0; k < r[j].range.length; k += 3) {
        ranges.push(generateRange(r[j].range[k + 0], r[j].range[k + 1], r[j].range[k + 2]));
      }
    }
    if (symbols) {
      opts.push("--symbols", symbols);
    }
    if (ranges.length !== 0) {
      opts.push("--range", ranges.join(","));
    }
  }

  opts.push("--format", args.format);
  opts.push("-o", args.output + ".c");

  return opts.join(" ");
};

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const fontConvert = async (files, args) => {
  return new Promise((resolve, reject) => {
    const fonts = [];

    Promise.all(
      files.map(async (el, idx) => {
        const range = el.range;
        const symbols = el.symbols;
        const selectedFile = el.file;
        if (selectedFile && (range.length || symbols.length)) {
          fonts[idx] = {
            source_path: selectedFile.name,
            source_bin: Buffer.from(await readFileAsArrayBuffer(selectedFile)),
            ranges: [{ range: [], symbols: "" }],
          };
          fonts[idx].ranges[0].symbols = symbols;
          let r_sub = range.split(",");
          if (range.length) {
            for (let i = 0; i < r_sub.length; i++) {
              let r = r_sub[i].split("-");
              fonts[idx].ranges[0].range[i * 3 + 0] = parseInt(r[0]);
              if (r[1]) {
                fonts[idx].ranges[0].range[i * 3 + 1] = parseInt(r[1]);
              } else {
                fonts[idx].ranges[0].range[i * 3 + 1] = parseInt(r[0]);
              }
              fonts[idx].ranges[0].range[i * 3 + 2] = parseInt(r[0]);
            }
          }
        }
      })
    )
      .catch(() => {
        reject("Error reading the font file. ");
        return;
      })
      .then(() => {
        args.font = fonts;

        // Generate the command line arguments
        args.opts_string = generateOptsString(args);

        const ext = "." + (args.format === "lvgl" ? "c" : args.format);

        // Call the font converter
        convert(args)
          .then((result) => {
            // Save the result as a file
            const blob = new Blob([result[args.output]], { type: "text/plain;charset=utf-8" });
            fileSaver.saveAs(blob, args.output + ext);
            resolve("Font file converted successfully.");
            return;
          })
          .catch((err) => {
            if (err instanceof AppError) {
              reject(err.message.trim());
            } else {
              reject("Please attach a font file before submitting the form.");
              return;
            }
          });
      });
  });
};

export default fontConvert;
