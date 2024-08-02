import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/welcome.module.css";
import Image from "next/image";

function Welcome() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.imageContainer}>
        <Image src="/logo-1.JPG" alt="Welcome Image" width={300} height={300} />
      </div>
      <div className={styles.welcomeText}>
        <h1>Aloe Health Products</h1>
      </div>
    </div>
  );
}

export default Welcome;
