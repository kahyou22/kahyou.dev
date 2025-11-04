import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Image src="/logo.svg" alt="logo" width={32} height={32} preload />
      <h1>테스트</h1>
    </div>
  );
}
