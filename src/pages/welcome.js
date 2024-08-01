import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/welcome.module.css";
import Image from "next/image";

function Welcome() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/home"); // Redirect to home page
          }, 1000); // Delay before redirection
          return prevCount;
        }
      });
    }, 30); // 100 counts in 3000ms (3 seconds)

    return () => clearInterval(interval);
  }, [router]);

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
