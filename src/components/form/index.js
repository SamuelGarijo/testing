import { useState } from "react";
import { Text, Button, Icon } from "@/components/common";
import styles from "./index.module.css";

export const Input = ({ className, label, size = "md", hideLabel = false, type = "text", placeholder, ...props }) => {
  const id = props["id"] || Math.random().toString(36).substr(2, 9);
  const labelClass = `${styles.label} ${styles[size]} ${hideLabel ? "visuallyHidden" : ""}`;
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} className={`${styles.input} ${styles[size]}`} {...props} />
    </div>
  );
};

export const Textarea = ({
  className,
  label,
  size = "md",
  hideLabel = false,
  type = "text",
  placeholder,
  ...props
}) => {
  const id = props["id"] || Math.random().toString(36).substr(2, 9);
  const labelClass = `${styles.label} ${styles[size]} ${hideLabel ? "visuallyHidden" : ""}`;
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${styles.textarea} ${styles[size]}`}
        {...props}
      />
    </div>
  );
};

export const Select = ({
  className,
  children,
  label,
  size = "md",
  hideLabel = false,
  type = "text",
  placeholder,
  ...props
}) => {
  const id = props["id"] || Math.random().toString(36).substr(2, 9);
  const labelClass = `${styles.label} ${styles[size]} ${hideLabel ? "visuallyHidden" : ""}`;
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select id={id} type={type} placeholder={placeholder} className={`${styles.select} ${styles[size]}`} {...props}>
          {children}
        </select>
        <Icon name="select" size={16} fill="none" className={styles.selectIcon} />
      </div>
    </div>
  );
};

export const Checkbox = ({
  className = "",
  id,
  size = "md",
  hideLabel = false,
  value = "",
  note,
  children,
  ...props
}) => {
  const labelClass = `${styles.label} ${styles[size]} ${hideLabel ? "visuallyHidden" : ""}`;
  return (
    <div className={`${styles.checkboxWrapper} ${className}`.trim()}>
      <div className={styles.checkboxIconWrapper}>
        <input className={styles.checkbox} type="checkbox" value={value} id={id} {...props} />
        <Icon name="checkmark" size={16} fill="none" className={styles.checkboxIcon} />
      </div>
      <Text as="label" className={labelClass} htmlFor={id}>
        {children}
        {note && (
          <Text as="span" size="xs" color="quarternary" className={styles.note}>
            {note}
          </Text>
        )}
      </Text>
    </div>
  );
};

export const FileInput = ({
  className,
  name,
  label,
  size = "md",
  hideLabel = false,
  buttonLabel = "Browse",
  error,
  ...props
}) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const fileNames = Array.from(e.target.files)
      .map((file) => file.name)
      .join(", ");
    setFileName(e.target.files.length === 0 ? "No file chosen" : fileNames);
  };

  const labelClass = `${styles.label} ${styles[size]} ${hideLabel ? "visuallyHidden" : ""}`;

  return (
    <div className={className}>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <div className={styles.customFileInput}>
        <input className={styles.fileInput} id={name} name={name} type="file" onChange={handleFileChange} {...props} />
        <Button className={styles.fakeButton} variant="secondary" size={size}>
          {buttonLabel}
        </Button>
        <Text as="span" className={`${styles.fileName} ${styles[size]}`}>
          {fileName}
        </Text>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
