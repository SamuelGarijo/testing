import React from "react";

import styles from "./youtube-embed.module.css";

const YoutubeEmbed = ({ embedId }) => (
  <div className={styles.wrapper}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}/?autoplay=1&mute=1&loop=1&playsinline=1&rel=0&color=white&iv_load_policy=3`}
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
