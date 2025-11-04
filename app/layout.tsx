import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "테스트",
  description: "테스트",
};

const pretendard = localFont({
  src: "./../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <header>
          <nav></nav>
        </header>
        <div className="main-wrapper">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
