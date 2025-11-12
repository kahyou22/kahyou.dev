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
    <div className={`${style.about}`}>
      <div className={style["avatar-wrapper"]}></div>
      <h3>정문주</h3>
      <h4>아마추어 소프트웨어 엔지니어</h4>
      <hr />
      <div className={`md-body ${style.intro}`}>
        <AboutInfo />
      </div>
    </div>
  );
}
