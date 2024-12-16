import styles from "./feature-grid.module.css";

const FeatureGrid = ({ className = "", children, ...props }) => {
  const classNames = `${styles.featureGrid} ${className}`.trim();
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export const FeatureGridItem = ({ className = "", children, ...props }) => {
  const classNames = `${styles.featureGridItem} ${className}`.trim();
  return (
    <div className={classNames} {...props}>
      <div className={styles.featureGridItemContent}>{children}</div>
    </div>
  );
};

export default FeatureGrid;
