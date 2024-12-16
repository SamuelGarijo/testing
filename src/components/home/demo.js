import styles from "./demo.module.css";
import { Text, LVGLEmbed } from "@/components/common";
import Arrow from "@/assets/home-demo-arrow.svg";

const DataItem = ({ label, value }) => {
  return (
    <div className={styles.dataItem}>
      <div className={styles.dataItemLabel}>{label}</div>
      <div className={styles.dataItemValue}>{value}</div>
    </div>
  );
};

const Demo = ({ className, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tooltipWrapper}>
        <div className={styles.demoWrapper}>
          <LVGLEmbed src="/demos/multilang/index.html" title="Demo" width={313} height={426} res="1.5x" />
        </div>
        <Arrow className={styles.tooltipArrow} />
        <Text as="p" size="2xl" color="primary" className={styles.tooltipText}>
          Drag a list item to the right to hide it.
        </Text>
      </div>
      <Text as="p" size="xs" color="primary" className={styles.demoText}>
        LVGL and this demo required only:
      </Text>
      <div className={styles.dataTable}>
        <div className={styles.dataItemGroup}>
          <DataItem label="RAM" value="50kb" />
          <DataItem label="Flash" value="100kb" />
        </div>
        <div className={styles.dataItemGroup}>
          <DataItem label="Fonts" value="30kb" />
          <DataItem label="Code lines" value="200" />
        </div>
      </div>
    </div>
  );
};

export default Demo;
