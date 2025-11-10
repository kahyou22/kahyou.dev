import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import ThemePicker from "./ThemePicker";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="left">
          <a className="title" href="/">
            <Image src="/logo.svg" alt="logo" width={22} height={22} preload />
            <h1>블로그</h1>
          </a>
          <div className="menu">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                Blog
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm">
                About
              </Button>
            </Link>
          </div>
        </div>
        <div className="right">
          <ThemePicker />
        </div>
      </nav>
    </header>
  );
}
