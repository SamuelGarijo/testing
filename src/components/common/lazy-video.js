import { useEffect, useRef } from "react";

const LazyVideo = ({ src, width, height, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
      rootMargin: "0px 0px 200px 0px",
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return <video ref={videoRef} src={src} width={width} height={height} muted playsInline loop {...props} />;
};

export default LazyVideo;
