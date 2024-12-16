import ReactMarkdown from "react-markdown";
import styles from "./richtext.module.css";

export default function RichText({ children, className, size = "lg", color = "inherit", type = "markdown", html }) {
  let classNames = `${styles.richtext} ${styles[size]} ${styles[color]} ${className || ""}`.trim();

  if (type === "html" && children) {
    return <div className={classNames}>{children}</div>;
  } else if (type === "html" && html) {
    return <div className={classNames} dangerouslySetInnerHTML={{ __html: html }}></div>;
  } else if (type === "markdown") {
    return <ReactMarkdown className={classNames}>{children}</ReactMarkdown>;
  } else {
    return <p className={classNames}>{children}</p>;
  }
}
