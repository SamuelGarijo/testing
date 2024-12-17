import "@/styles/global.css";
import "@/styles/prism.css";
import { MainNav, TopBanner, Footer, Contact } from "@/components/common";
import { GoogleAnalytics } from "@next/third-parties/google";
import useThemeStore from "@/store/useThemeStore";
import PopupForm from "@/components/common/PopupForm";


export default function MyApp({ Component, pageProps }) {
  const theme = useThemeStore((state) => state.theme);
  const mainClass = useThemeStore((state) => state.mainClass);

  return (
    <>
      <GoogleAnalytics gaId="G-1FFVHYD2NL" />
      <main className={`main ${mainClass}`} data-theme={theme}>
        <TopBanner />
        <MainNav />
        <div className="view">
          <Component {...pageProps} />
        </div>
        <Footer />
        <Contact />
      </main>
      <PopupForm /> {/* Popup añadido globalmente */}
    </>
  );
}
