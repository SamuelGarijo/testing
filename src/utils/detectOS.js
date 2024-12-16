export const detectOS = () => {
  if (typeof navigator === "undefined") {
    return "unknown";
  }
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const platform = navigator.platform || "unknown";

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  if (/Win/i.test(userAgent)) {
    return "Windows";
  }

  if (/Mac/i.test(userAgent)) {
    if (
      /MacIntel/.test(platform) &&
      /Apple/.test(navigator.vendor) &&
      /Safari/.test(userAgent) &&
      !/Chrome/.test(userAgent)
    ) {
      return "MacOS Silicon";
    }
    return "MacOS Intel";
  }

  if (/Linux/i.test(userAgent)) {
    return "Linux";
  }

  return "unknown";
};
