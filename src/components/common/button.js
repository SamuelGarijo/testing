import Link from "next/link";
import styles from "./button.module.css";

const Button = ({ className, variant = "primary", size = "md", href, type, children, ...props }) => {
  const buttonStyles = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`.trim();

  if ((type && type === "submit") || (!href && !type)) {
    return (
      <button className={buttonStyles} {...props}>
        {children}
      </button>
    );
  } else {
    return (
      <Link className={buttonStyles} href={href || "#"} {...props}>
        {children}
      </Link>
    );
  }
};

export default Button;
