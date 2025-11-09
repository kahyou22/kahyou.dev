import AboutInfo from "./about.mdx";
import "@/styles/markdown.css";
import style from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About",
};

export default function About() {
  return (
    <div className={`md-body ${style.about}`}>
      <AboutInfo />
    </div>
  );
}
