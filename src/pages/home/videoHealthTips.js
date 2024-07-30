import React, { useState, useEffect } from "react";
import styles from "../../styles/comps/videohealthtips.module.css";
import Image from "next/image";
import { db } from "../../../firebase.config";
import { ref, get } from "firebase/database";

function VideoHealthTips() {
  const [productData, setProductData] = useState([]);
  console.log("video com", productData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "sneakers");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setProductData(dataArray);
        } else {
          setProductData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setProductData([]);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.productContainerHeader}>
          <h1>Showing: Video Health Tips</h1>
        </div>
        {productData.map((product, index) => (
          <div className={styles.productContainer} key={index}>
            <div className={styles.productHeader}>
              <h1>{product.title}</h1>
            </div>
            <div className={styles.productImage}>
              <video controls></video>
            </div>
            <div className={styles.productDescription}>
              <div className={styles.description}>
                <h1>Price:</h1>
                <h1>{product.productPrice}</h1>
              </div>
              <div className={styles.readMore}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default VideoHealthTips;
