import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase.config";

function AloeDrinks() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
   const productRef = ref(db, "sneakers");
   onValue(productRef, (snapshot) => {
     const data = snapshot.val();
     const productList = [];
     for (let id in data) {
       productList.push({ id, ...data[id] });
     }
     setProductData(productList);
   });
 }, []);

  return (
        <div className={styles.mainContainer} >
          <div className={styles.productContainerHeader}>
            <h1>Showing: Aloe Drinks</h1>
          </div>
          <div className={styles.productContainer}>
            <div className={styles.productHeader}>
              <h1>sk</h1>
              <CartIcon className={styles.CartIcon} />
            </div>
            <div className={styles.productImage}>
              <img
                src="/fridge.jpg"
                alt="product-image"
                className={styles.image}
              />
            </div>
            <div className={styles.productDescription}>
              <div className={styles.description}>
                <h1>Price:</h1>
                <h1>ld</h1>
              </div>
              <div className={styles.readMore}>
                <button>Read More</button>
              </div>
            </div>
          </div>

          <div className={styles.productContainer}>
            <div className={styles.productHeader}>
              <h1>Title Goes Here</h1>
              <CartIcon className={styles.CartIcon} />
            </div>
            <div className={styles.productImage}>
              <img
                src="/fridge.jpg"
                alt="product-image"
                className={styles.image}
              />
            </div>
            <div className={styles.productDescription}>
              <div className={styles.description}>
                <h1>Price:</h1>
                <h1>ld</h1>
              </div>
              <div className={styles.readMore}>
                <button>Read More</button>
              </div>
            </div>
          </div>

          <div className={styles.productContainer}>
            <div className={styles.productHeader}>
              <h1>sk</h1>
              <CartIcon className={styles.CartIcon} />
            </div>
            <div className={styles.productImage}>
              <img
                src="/fridge.jpg"
                alt="product-image"
                className={styles.image}
              />
            </div>
            <div className={styles.productDescription}>
              <div className={styles.description}>
                <h1>Price:</h1>
                <h1>ld</h1>
              </div>
              <div className={styles.readMore}>
                <button>Read More</button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default AloeDrinks;
