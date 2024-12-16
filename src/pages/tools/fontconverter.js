import { useState, useRef, useEffect, forwardRef } from "react";
import { Section, Heading, Text, Button, Icon, Toast, Meta } from "@/components/common";

import { Input, Select, Textarea, Checkbox, FileInput } from "@/components/form";

import { Faq, FaqItem } from "@/components/common";

import fontConvert from "@/lib/lv_font_conv";

import styles from "./fontconverter.module.css";

// Font box component
const TTFFont = forwardRef(({ onRemove, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.formBox}>
      <Heading as="h2" size="h5">
        TTF/WOFF font
      </Heading>
      <FileInput label="TTF/WOFF file" hideLabel={true} name="font_file" accept=".ttf, .woff" required />
      <Textarea
        label="Range"
        name="font_range"
        placeholder="Ranges and/or characters to include. E.g. 0x20-0x7F, 0x200, 450"
        rows="2"
        cols="40"
      />
      <Textarea
        label="Symbols"
        name="font_symbols"
        placeholder="List of character to include. E.g. ABC0123ÁÉŐ"
        rows="2"
        cols="50"
      />

      <Text size="xs" color="quarternary">
        You can use both ”Range“ and ”Symbols“ or only one of them.
      </Text>

      {onRemove && (
        <Button onClick={onRemove} variant="secondary" size="md">
          <Icon name="trash" size={16} fill="none" />
          Remove font
        </Button>
      )}
    </div>
  );
});
TTFFont.displayName = "TTFFont";

const Form = () => {
  const formRef = useRef(null);
  const [fonts, setFonts] = useState([{}]);
  const fontRefs = useRef([]);
  const prevFontsLength = useRef(fonts.length);
  const [toast, setToast] = useState({ message: null, type: null, key: 0 });

  // Scroll to the last font box when a new one is added or one is removed (except when page is loaded)
  useEffect(() => {
    if (fonts.length < prevFontsLength.current || fonts.length > 1) {
      fontRefs.current[fonts.length - 1].scrollIntoView({ behavior: "smooth" });
    }
    prevFontsLength.current = fonts.length;
  }, [fonts]);

  // Add a listener to the form to handle invalid events
  useEffect(() => {
    const formRefCurrent = formRef.current;
    const handleInvalid = (e) => {
      // Prevent the browser from showing a validation message
      e.preventDefault();
      // Scroll to the invalid element
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
      e.target.focus(); // Add a class to highlight the invalid element
      // Show a toast message
      setToast({ message: e.target.validationMessage, type: "error", key: toast.key + 1 });
    };
    formRefCurrent.addEventListener("invalid", handleInvalid, true); // The third parameter is set to true to capture the event in the capturing phase
    return () => {
      formRefCurrent.removeEventListener("invalid", handleInvalid, true);
    };
  }, [toast.key]);

  // Event handlers
  // Add a new font box
  const handleInsertButtonClick = (e) => {
    e.preventDefault();
    setFonts((prevFonts) => [...prevFonts, {}]);
  };

  // Remove a font box
  const handleRemoveButtonClick = (e, index) => {
    e.preventDefault();
    setFonts((prevFonts) => prevFonts.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.target.elements;

    // Get the form values to pass to the converter
    const args = {
      size: parseInt(formElements.size.value, 10),
      bpp: parseInt(formElements.bpp.value, 10),
      no_compress: !formElements.compression.checked,
      lcd: formElements.subpixel2.checked,
      use_color_info: formElements.use_color_info.checked,
      format: formElements.format.value,
      output: formElements.name.value,
      lv_fallback: formElements.fallback.value,
    };

    // Collect files data to pass to the converter
    const files = [];
    const filesArray = !formElements.font_file.length ? [formElements.font_file] : Array.from(formElements.font_file);
    const rangeArray = !formElements.font_range.length
      ? [formElements.font_range]
      : Array.from(formElements.font_range);
    const symbolsArray = !formElements.font_symbols.length
      ? [formElements.font_symbols]
      : Array.from(formElements.font_symbols);
    filesArray.forEach((file, i) => {
      files.push({
        file: file.files[0],
        range: rangeArray[i].value,
        symbols: symbolsArray[i].value,
      });
    });

    // Call the converter
    fontConvert(files, args)
      .then((msg) => {
        setToast({ message: msg, type: "success", key: toast.key + 1 });
      })
      .catch((errMsg) => {
        setToast({ message: errMsg, type: "error", key: toast.key + 1 });
      });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.intro} data-theme="orange">
        <Text color="secondary" size="sm">
          The font converter is designed to be compatible with{" "}
          <a href="https://github.com/lvgl/lvgl" title="Free and open-source Embedded GUI Library">
            LVGL.
          </a>
          <br />
          The offline version (as well as the source code for this website) is available{" "}
          <a href="https://github.com/lvgl/lv_font_conv" title="Offline font converter on GitHub">
            here.
          </a>
        </Text>
      </div>

      <Input className={styles.formRow} label="Name" id="name" name="name" placeholder="E.g. arial_40" required />
      <Input
        className={styles.formRow}
        label="Size"
        id="size"
        name="size"
        type="number"
        min="0"
        placeholder="Height in px"
        required
      />
      <Select className={styles.formRow} label="Bpp" id="bpp" name="bpp">
        <option value="1">1 bit-per-pixel</option>
        <option value="2">2 bit-per-pixel</option>
        <option value="3">3 bit-per-pixel (Needs compression enabled)</option>
        <option value="4">4 bit-per-pixel</option>
        <option value="8">8 bit-per-pixel</option>
      </Select>
      <Input
        className={styles.formRow}
        label="Fallback"
        id="fallback"
        name="fallback"
        placeholder="E.g. lv_font_montserrat_24"
      />
      <Select className={styles.formRow} label="Output format" name="format" id="format">
        <option value="lvgl">C file</option>
        <option value="bin">Binary</option>
      </Select>
      <div className={styles.checkboxes}>
        <Checkbox id="compression" name="compression">
          Enable <a href="https://docs.lvgl.io/master/overview/font.html#compressed-fonts">Font compression</a> (reduces
          size but results in slower rendering)
        </Checkbox>
        <Checkbox id="subpixel2" name="subpixel2">
          <a href="https://docs.lvgl.io/master/overview/font.html#subpixel-rendering">Horizontal subpixel rendering</a>{" "}
          (may improve font quality but results in larger fonts)
        </Checkbox>
        <Checkbox
          id="use_color_info"
          name="use_color_info"
          note="Since gray tones are emulated via transparency, result will be good on contrast background only.">
          Try to use glyph color info from font to create grayscale icons.
        </Checkbox>
      </div>

      {fonts.map((_, i) => (
        <TTFFont
          key={i}
          formName={`font${i + 1}`}
          onRemove={i !== 0 ? (e) => handleRemoveButtonClick(e, i) : undefined}
          ref={(el) => (fontRefs.current[i] = el)}
        />
      ))}

      <Button
        variant="secondary"
        size="sm"
        id="insert-button"
        onClick={handleInsertButtonClick}
        className={styles.insertButton}>
        <Icon name="plus" size={16} fill="none" />
        Include another font
      </Button>

      <Button type="submit" size="lg">
        Submit
      </Button>

      <Toast key={toast.key} message={toast.message} messageType={toast.type} />
    </form>
  );
};

const FontConverter = () => {
  return (
    <>
      <Meta title="Font Converter — LVGL" />
      <Section className={styles.hero} fillView={true} data-bg="primary" data-theme="teal">
        <div className={styles.heroWrapper}>
          <aside className={styles.aside}>
            <Heading className={styles.asideHeading}>Font Converter</Heading>
            <Text color="secondary" className={styles.asideBlurb}>
              Convert TTF and WOFF fonts to C array.
            </Text>
            <Text color="tertiary" size="md">
              With this free online font converter tool you can create C array from any TTF or WOFF. You can select
              ranges of Unicode characters and specify the bpp (bit-per-pixel).
            </Text>
          </aside>
          <div className={styles.formWrapper} data-theme="light">
            <Form />
          </div>
        </div>
      </Section>
      <Section>
        <Faq className={styles.faq}>
          <FaqItem question="How to use the font converter?" opened={true}>
            <ol>
              <li>
                Give <strong>name</strong> to the output font. E.g. ”arial_40”
              </li>
              <li>
                Specify the <strong>height</strong> in px
              </li>
              <li>
                Set the <strong>bpp</strong> (bit-per-piel). Higher value results smoother (anti-aliased) font
              </li>
              <li>
                Choose a <strong>TTF or WOFF font</strong>
              </li>
              <li>
                Set a <strong>range</strong> of Unicode character to include in your font or list the characters in the{" "}
                <strong>Symbols</strong> field
              </li>
              <li>
                Optionally choose another font too and specify the ranges and/or symbols for it as well. The characters
                will be merged into the final C file.
              </li>
              <li>
                Click the <strong>Convert</strong> button to download the result C file.
              </li>
            </ol>
          </FaqItem>
          <FaqItem question="How to use the generated fonts in LVGL?">
            <ol>
              <li>Copy the result C file into your LVGL project</li>
              <li>
                In a C file of your application declare the font as: <code>extern const lv_font_t my_font_name;</code>{" "}
                or simply <code>LV_FONT_DECLARE(my_font_name);</code>
              </li>
              <li>
                Set the font in a style: <code>style.text.font = &amp;my_font_name;</code>{" "}
              </li>
            </ol>
          </FaqItem>
          <FaqItem question="Useful notes">
            <ul>
              <li>
                <strong>Unicode table</strong> to pick letters:{" "}
                <a href="https://unicode-table.com/" target="_blank">
                  https://unicode-table.com/
                </a>
              </li>
              <li>
                <strong>Unicode ranges</strong>{" "}
                <a href="http://jrgraphix.net/research/unicode.php" target="_blank">
                  http://jrgraphix.net/research/unicode.php
                </a>
              </li>
              <li>
                <strong>A pixel perfect font</strong>:{" "}
                <a href="https://sourceforge.net/projects/terminus-font/">Terminus</a>.
              </li>
              <li>
                <strong>List of built-in symbols</strong> Use this{" "}
                <a href="https://github.com/lvgl/lvgl/raw/refs/heads/master/scripts/built_in_font/FontAwesome5-Solid+Brands+Regular.woff">
                  FontAwesome symbol font
                </a>{" "}
                and copy this list to <strong>Range</strong>:<br />
                <pre>
                  61441,61448,61451,61452,61452,61453,61457,61459,61461,61465,61468,61473,61478,61479,61480,61502,61512,61515,61516,61517,61521,61522,61523,61524,61543,61544,61550,61552,61553,61556,61559,61560,61561,61563,61587,61589,61636,61637,61639,61671,61674,61683,61724,61732,61787,61931,62016,62017,62018,62019,62020,62087,62099,62212,62189,62810,63426,63650
                </pre>
              </li>
              <li>
                To learn more about the <strong>font handling of LVGL</strong> read this{" "}
                <a href="https://docs.lvgl.io/master/overview/font.html">Guide</a>
              </li>
            </ul>
          </FaqItem>
        </Faq>
      </Section>
    </>
  );
};

export default FontConverter;
