import { useState, useEffect } from "react";
import { Text, Icon } from "@/components/common";

import styles from "./toast.module.css";

const Toast = ({ message, messageType }) => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      switch (messageType) {
        case "error":
          setTheme("red");
          setShowClose(true);
          break;
        case "success":
          setTheme("green");
          setShowClose(false);
          break;
        case "keepOpen":
          setTheme("light");
          setShowClose(true);
          break;
        default:
          setTheme("light");
      }

      if (!showClose) {
        const timer = setTimeout(() => {
          setShow(false);
        }, 3000); // Auto-hide after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [message, messageType, showClose]);

  const classNames = `${styles.toast} ${show ? styles.isVisible : ""}`.trim();

  return (
    <div className={classNames} data-theme={theme}>
      <Text size="sm" color="primary">
        <strong>{message?.toString()}</strong>
      </Text>
      {showClose && (
        <div
          className={styles.close}
          onClick={() => {
            setShow(false);
          }}>
          <Icon name="close" size={16} />
        </div>
      )}
    </div>
  );
};

export default Toast;
