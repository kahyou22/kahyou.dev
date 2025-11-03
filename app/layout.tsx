import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "테스트",
  description: "테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="main-wrapper">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
