import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "블로그",
    template: "%s | 블로그",
  },
  description: "테스트",
};

const pretendard = localFont({
  src: "./../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "sans-serif",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body className={pretendard.className}>
        <Header />
        <div className="main-wrapper">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
