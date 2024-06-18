/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  const themeCtx = useContext(ThemeContext);
  const { theme } = themeCtx;

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <main className={styles.container}>{children}</main>
    </div>
  );
}