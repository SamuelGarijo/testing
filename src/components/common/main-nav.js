"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { Icon, Heading } from "@/components/common";
import styles from "./main-nav.module.css";

import Logo from "@/assets/main-nav_logo.svg";

const navItems = [
  ["Documentation", "https://docs.lvgl.io/master/"],
  [
    "Use Cases",
    "#",
    [
      ["Demos", "/demos"],
      ["Case Studies", "#"],
      ["IDO Smartwatches", "/case-studies/ido/"],
      ["Xiaomi Smartwatches", "/case-studies/xiaomi/"],
      ["Zildjian E-drum Kit", "/case-studies/zildjian/"],
    ],
  ],
  ["Features", "/features"],
  ["Boards", "/boards"],
  [
    "Tools",
    "#",
    [
      ["Project Creator", "/tools/project-creator"],
      ["Font Converter", "/tools/fontconverter"],
      ["Image Converter", "/tools/imageconverter"],
    ],
  ],
  ["Services", "/services"],
  ["Forum", "https://forum.lvgl.io/"],
  ["Blog", "https://blog.lvgl.io"],
];

const NavItem = ({ label, href, subnav, currentPath }) => (
  <>
    {subnav && (
      <div className={styles.navLinkWrapper}>
        <Link href={href} className={`${styles.navLink} ${currentPath === href ? styles.active : ""}`}>
          {label}
        </Link>
        <div className={styles.subnav}>
          {subnav.map((item, index) => {
            return item[1] === "#" ? (
              <Heading key={index} as="div" size="h7" className={styles.navGroupHeader}>
                {item[0]}
              </Heading>
            ) : (
              <Link
                href={item[1]}
                key={index}
                className={`${styles.navLink} ${currentPath === item[1] ? styles.active : ""}`}>
                {item[0]}
              </Link>
            );
          })}
        </div>
      </div>
    )}
    {!subnav && (
      <Link href={href} className={`${styles.navLink} ${currentPath === href ? styles.active : ""}`}>
        {label}
      </Link>
    )}
  </>
);

export default function MainNav() {
  const MOBILE_VIEW_BREAKPOINT = 1140;

  const [isSelected, setIsSelected] = useState(false);
  const [isNavAnimated, setIsNavAnimated] = useState(false);

  const router = useRouter();
  const currentPath = router.pathname;

  const toggleSelected = useCallback(() => {
    setIsSelected(!isSelected);
    setIsNavAnimated(true);
  }, [isSelected, setIsSelected, setIsNavAnimated]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < MOBILE_VIEW_BREAKPOINT;
      setIsNavAnimated(isMobileView ? isNavAnimated : false);
      setIsSelected(isMobileView ? isSelected : false);
    };

    const handleClick = (event) => {
      // Close the nav if the user clicks on a nav item
      if (event.target.closest(`.${styles.navLink}`) && isSelected) {
        toggleSelected();
      }

      // Close the nav if the user clicks outside of the nav or the hamburger button
      if (!event.target.closest(`.${styles.nav}`) && !event.target.closest(`.${styles.hamburger}`) && isSelected) {
        toggleSelected();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClick);
    };
  }, [isSelected, isNavAnimated, toggleSelected]);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.hamburger} ${isSelected ? styles.selected : ""}`}
        onClick={toggleSelected}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleSelected();
          }
        }}
        role="button"
        aria-expanded={isSelected}
        aria-label="Navigation Menu"
        tabIndex="0"></div>
      <Link className={styles.logo} href="/" onClick={() => isSelected && toggleSelected()}>
        <Logo alt="Company Logo" />
      </Link>
      <nav className={`${styles.nav} ${isNavAnimated ? "" : styles.noTransition} ${isSelected ? styles.show : ""}`}>
        {navItems.map((item, index) => {
          return <NavItem key={index} label={item[0]} href={item[1]} subnav={item[2]} currentPath={currentPath} />;
        })}
      </nav>
      <div className={styles.cta}>
        <Link href="https://github.com/lvgl" alt="LVGL on GitHub" onClick={() => isSelected && toggleSelected()}>
          <Icon size={24} name="github" title="GitHub Icon" type="" />
        </Link>
      </div>
    </header>
  );
}
