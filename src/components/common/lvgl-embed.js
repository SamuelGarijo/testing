import { useEffect, useRef, useState } from "react";
import styles from "./lvgl-embed.module.css";

function LVGLEmbed({ src, title, width, height, res = "1x", active, bgColor = "var(--color-base)", ...props }) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef(null);
  const resNum = parseFloat(res.replace("x", ""));

  function handleResize() {
    const iframeElement = iframeRef.current;
    const parentWidth = iframeElement.parentElement.offsetWidth;
    const scale = parentWidth / iframeElement.offsetWidth;
    iframeElement.style.transform = `scale(${scale})`;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          setLoaded(true);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 200px 0px" }
    );

    observer.observe(iframeRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loaded]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // call the function initially to set the scale

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [active]);

  return (
    <div className={styles.wrapper} style={{ backgroundColor: bgColor }}>
      {!loaded && <div className={styles.spinner}></div>}
      <iframe
        ref={iframeRef}
        src={loaded ? src : undefined}
        className={`${styles.iframe} ${loaded ? styles.loaded : ""}`}
        title={title}
        width={width * resNum}
        height={height * resNum}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
}

export default LVGLEmbed;
