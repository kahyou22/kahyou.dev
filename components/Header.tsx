import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="left">
          <a className="title" href="/">
            <Image src="/logo.svg" alt="logo" width={32} height={32} preload />
            <h1>블로그</h1>
          </a>
          <div className="menu">
            <a href="/blog">blog</a>
            <a href="/about">about</a>
          </div>
        </div>
        <div className="right">.</div>
      </nav>
    </header>
  );
}
