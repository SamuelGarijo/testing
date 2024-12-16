import styles from "./icon.module.css";
import SVG from "react-inlinesvg";

const Wrapper = ({ className = "", color, children }) => (
  <div className={`${styles.iconWrapper} ${styles[color]} ${className}`.trim()}>{children}</div>
);

const Icon = ({ className, color = "currentColor", name = "lvgl", type, size = 32, title, description, ...props }) => {
  const fill = props.fill && props.fill !== "none" ? props.fill : props.fill !== "none" ? "currentColor" : null;
  const preProcess = (code) => {
    if (!fill) {
      return code;
    } else {
      return code.replace(/fill="(?!none).*?"/g, `fill="${fill}"`).replace(/stroke="(?!none).*?"/g, `stroke="${fill}"`);
    }
  };

  if (type === "illustrative") {
    return (
      <Wrapper className={className} color={color}>
        <SVG
          src={`/images/icons/${size}/${name}.svg`}
          fill={fill}
          width={size}
          height={size}
          description={description}
          title={title || name}
          preProcessor={preProcess}
        />
      </Wrapper>
    );
  } else {
    return (
      <SVG
        src={`/images/icons/${size}/${name}.svg`}
        className={`${styles[color] || ""} ${className || ""}`.trim()}
        fill={fill}
        width={size}
        height={size}
        description={description}
        title={title || name}
        preProcessor={preProcess}
      />
    );
  }
};

export default Icon;
