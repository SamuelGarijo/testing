import { useState, useRef, useEffect, forwardRef } from "react";

import Link from "next/link";

import { Tabs, TabPanel } from "@/components/common/tabs";
import { Section, Heading, Text, RichText, Button, Toast, Meta } from "@/components/common";
import { Select, FileInput, Checkbox } from "@/components/form";
import { Faq, FaqItem } from "@/components/common";

import styles from "./imageconverter.module.css";

import imgConvertV8 from "@/lib/lv_img_conv_v8";
import imgConvertV9 from "@/lib/lv_img_conv_v9";

const ACTIVE_TAB_INDEX = 0;

const Form = () => {
  const formsRef = useRef(null);

  const [toast, setToast] = useState({ message: null, type: null, key: 0 });
  const [activeTabIndex, setActiveTab] = useState(ACTIVE_TAB_INDEX);

  useEffect(() => {
    const formsRefCurrent = formsRef.current;
    const handleInvalid = (e) => {
      e.preventDefault(); // Prevent the browser from showing a validation message
      // Scroll to the invalid element
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
      e.target.focus();

      // Show a toast message
      setToast({ message: e.target.validationMessage, type: "error", key: toast.key + 1 });
    };

    formsRefCurrent.querySelectorAll("form").forEach((el) => {
      el.addEventListener("invalid", handleInvalid, true);
    });
    return () => {
      formsRefCurrent.querySelectorAll("form").forEach((el) => {
        el.removeEventListener("invalid", handleInvalid, true);
      });
    };
  }, [toast.key]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const formElements = e.target.elements;

    let colorFormat;
    const fileList = formElements.images.files;

    if (activeTabIndex === 1) {
      // LVGLv8
      colorFormat = parseInt(formElements.cf.value, 10);
      const outputFormat = formElements.of.value;
      const bigEndian = formElements.bigendian.checked;
      const dither = formElements.dither.checked;
      imgConvertV8(fileList, colorFormat, outputFormat, dither, bigEndian);
    } else if (activeTabIndex === 0) {
      // LVGLv9
      colorFormat = parseInt(formElements.cf.value, 10);
      imgConvertV9(fileList, colorFormat);
    }
  };

  return (
    <div ref={formsRef} className={styles.forms}>
      <Tabs className={styles.tabs} activeTabIndex={activeTabIndex} setActiveTab={setActiveTab}>
        <TabPanel
          className={styles.tabPanel}
          label="LVGL v9"
          count={0}
          id={styles.tabs}
          isActive={activeTabIndex === 0}>
          <form onSubmit={handleSubmit} className={styles.form} data-action="imgConvertV9">
            <div className={styles.intro} data-theme="orange">
              <Text color="secondary" size="sm">
                For image compression, stride, binary output, and extra color formats check out the{" "}
                <Link
                  href="https://github.com/lvgl/lvgl/blob/master/scripts/LVGLImage.py"
                  title="Offline image converter on GitHub">
                  Python image converter
                </Link>
                .
              </Text>
            </div>

            <FileInput
              label="Image file(s)"
              hideLabel={true}
              buttonLabel="Select image file(s)"
              name="images"
              id="images"
              accept="image/*"
              multiple
              required
            />

            <Select label="Color format" name="cf" id="cf">
              <option value="0">RGB565</option>
              <option value="1">RGB565A8</option>
              <option value="2">RGB888</option>
              <option value="3">XRGB8888</option>
              <option value="4">ARGB8888</option>
            </Select>

            <Button type="submit" size="lg">
              Convert
            </Button>
          </form>
        </TabPanel>
        <TabPanel
          className={styles.tabPanel}
          label="LVGL v8"
          count={1}
          id={styles.tabs}
          isActive={activeTabIndex === 1}>
          <form onSubmit={handleSubmit} className={styles.form} data-action="imgConvertV8">
            <FileInput
              label="Image file(s)"
              hideLabel={true}
              buttonLabel="Select image file(s)"
              name="images"
              id="images"
              accept="image/*"
              multiple
              required
            />

            <Select label="Color format" name="cf" id="cf">
              <option value="4">CF_ALPHA_1_BIT</option>
              <option value="5">CF_ALPHA_2_BIT</option>
              <option value="6">CF_ALPHA_4_BIT</option>
              <option value="7">CF_ALPHA_8_BIT</option>
              <option value="8">CF_INDEXED_1_BIT</option>
              <option value="9">CF_INDEXED_2_BIT</option>
              <option value="10">CF_INDEXED_4_BIT</option>
              <option value="11">CF_INDEXED_8_BIT</option>
              <option value="12">CF_RAW</option>
              <option value="12">CF_RAW_CHROMA</option>
              <option value="13">CF_RAW_ALPHA</option>
              <option value="14">CF_TRUE_COLOR</option>
              <option value="15">CF_TRUE_COLOR_ALPHA</option>
              <option value="16">CF_TRUE_COLOR_CHROMA</option>
              <option value="17">CF_RGB565A8</option>
            </Select>
            <RichText type="html" color="tertiary" size="sm">
              <p>
                <strong>Alpha byte</strong> Add a 8 bit Alpha value to every pixel
                <br />
                <strong>Chroma keyed</strong> Make <code>LV_COLOR_TRANSP (lv_conf.h)</code> pixels to transparent
              </p>
            </RichText>
            <Select label="Output format" name="of" id="of">
              <option value="c_array">C array</option>
              <option value="bin_332">Binary RGB332</option>
              <option value="bin_565">Binary RGB565</option>
              <option value="bin_565_swap">Binary RGB565 Swap</option>
              <option value="bin_888">Binary RGB888</option>
            </Select>

            <div className={styles.checkboxes}>
              <Checkbox id="dither" name="dither">
                Dither images (can improve quality)
              </Checkbox>
              <Checkbox id="bigendian" name="bigendian">
                Output in big-endian format
              </Checkbox>
            </div>

            <Button type="submit" size="lg">
              Convert
            </Button>
          </form>
        </TabPanel>
      </Tabs>
      <Toast key={toast.key} message={toast.message} messageType={toast.type} />
    </div>
  );
};

const ImageConverter = () => {
  return (
    <>
      <Meta title="Image Converter — LVGL" />
      <Section className={styles.hero} fillView={true} data-bg="primary" data-theme="purple">
        <div className={styles.heroWrapper}>
          <aside className={styles.aside}>
            <Heading className={styles.asideHeading}>Image Converter</Heading>
            <Text color="secondary" className={styles.asideBlurb}>
              Convert BMP, JPG, PNG, or SVG to C array to use them in LVGL.
            </Text>
          </aside>
          <div className={styles.formWrapper} data-theme="light">
            <Form />
          </div>
        </div>
      </Section>
      <Section>
        <Faq className={styles.faq}>
          <FaqItem question="How to use the image converter?" opened={true}>
            <ol>
              <li>Choose one or more images</li>
              <li>Give a name to the output file(s) (e.g. “wallpaper1”).</li>
              <li>Specify the desired color format.</li>
              <li>Click the Convert button to download the resulting file(s).</li>
            </ol>
          </FaqItem>
          <FaqItem question="How to use the generated file in LVGL">
            <ol>
              <li>Copy the resulting C file into your LVGL project</li>
              <li>
                In a C file of your application declare the image as: <code>LV_IMG_DECLARE(my_image_name);</code>
              </li>
              <li>
                Set the image as the source of an image object: <code>lv_image_set_src(img, &my_image_name)</code>;
              </li>
              <li>
                Checkout the <Link href="https://docs.lvgl.io/master/overview/image.html">Docs</Link> for more details.
              </li>
            </ol>
          </FaqItem>
        </Faq>
      </Section>
    </>
  );
};

export default ImageConverter;
