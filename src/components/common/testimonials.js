import styles from "./testimonials.module.css";
import data from "@/data/testimonials.json";
import SVG from "react-inlinesvg";

const Testimonials = ({ className, theme = "teal", ...props }) => {
  const testimonialData = data[0];
  return (
    <div className={styles.wrapper} data-theme={theme}>
      <div className={styles.testimonial}>
        <p className={styles.quote}>“{testimonialData.quote}”</p>
        <div>
          <div className={styles.name}>
            {testimonialData.name},{testimonialData.company}
          </div>
          <div className={styles.jobTitle}>{testimonialData.jobTitle}</div>
        </div>
        <SVG
          className={styles.logo}
          alt={`${testimonialData.company} logo`}
          src={testimonialData.logo}
          preProcessor={(code) => code.replace(/fill=".*?"/g, 'fill="currentColor"')}
        />
      </div>
    </div>
  );
};

export default Testimonials;
