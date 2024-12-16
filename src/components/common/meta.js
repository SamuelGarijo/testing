import Head from "next/head";

const metadata = {
  title: "LVGL — Light and Versatile Embedded Graphics Library",
  description:
    "LVGL is the most popular free and open source embedded graphics library targeting any MCU, MPU and display type to build beautiful UIs. We also do services like UI design, implementation and consulting.",
  keywords: "LVGL, embedded, graphics, library, open source, UI design, consulting",
  image: "https://lvgl.io/images/opengraph/lvgl.png",
};

function Meta({
  title = metadata.title,
  description = metadata.description,
  keywords = metadata.keywords,
  image = metadata.image,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:image" content={image} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16"></link>
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32"></link>
      <link rel="icon" type="image/png" href="/favicon-64x64.png" sizes="64x64"></link>
      <link rel="icon" type="image/png" href="/favicon-180x180.png" sizes="180x180"></link>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#343839"></link>
      <link rel="shortcut icon" href="/favicon.ico"></link>
    </Head>
  );
}

export default Meta;
