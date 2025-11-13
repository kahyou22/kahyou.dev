import AboutInfo from "./about.mdx";
import "@/styles/markdown.css";
import style from "./page.module.css";
import GithubLogo from "@/public/github.svg";
import GmailLogo from "@/public/gmail.svg";
import { Mail } from "lucide-react";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About",
};

export default function About() {
  return (
    <div className={style.about}>
      <div className="avatar-wrapper">
        <Image src="/pingu.webp" width={200} height={200} alt="pingu" />
      </div>
      <h3 className="name">정문주</h3>
      <h4 className="title">아마추어 소프트웨어 엔지니어</h4>
      <div className="links">
        <a href="mailto:kahyou222@gmail.com">
          <GmailLogo height={32} />
        </a>
        <a href="https://github.com/kahyou22" target="_blank">
          <GithubLogo width={33} height={32} />
        </a>
      </div>
      <hr />
      <div className="md-body intro">
        <AboutInfo />
      </div>
    </div>
  );
}
