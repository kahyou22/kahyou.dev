import Image from "next/image";
import Link from "next/link";

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
            <Link href="/blog">blog</Link>
            <Link href="/about">about</Link>
          </div>
        </div>
        <div className="right">.</div>
      </nav>
    </header>
  );
}
