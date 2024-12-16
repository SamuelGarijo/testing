const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, "src/lib/lv_img_conv_v8"),
      use: [
        {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "src/lib/lv_img_conv_v8/tsconfig.json"),
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, "src/lib/lv_img_conv_v9"),
      use: [
        {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "src/lib/lv_img_conv_v9/tsconfig.json"),
          },
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.resolve.alias["@"] = path.resolve(__dirname, "./src");

    return config;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/certificate",
        destination: "/",
        permanent: false,
      },
      {
        source: "/get-started",
        destination: "https://docs.lvgl.io/master/get-started/",
        basePath: false,
        permanent: false,
      },
    ];
  },
};
