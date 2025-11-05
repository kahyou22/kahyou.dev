import AboutInfo from "./about.mdx";
import style from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About",
};

export default function About() {
  return (
    <div className={style.about}>
      <AboutInfo />
    </div>
  );
}
