import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase.config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function AloeDrinks() {
  const [productData, setProductData] = useState([]);
  const [openAddCart, setOpenAddCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenAddCart = (product) => {
    setSelectedProduct(product);
    setOpenAddCart(true);
  };

  const handleCloseAddCart = () => {
    setOpenAddCart(false);
    setSelectedProduct(null);
  };

  const addToCart = () => {
    let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
    cartArray.push(selectedProduct);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    NotificationManager.success("Cart added successfully");
    handleCloseAddCart();
  };

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
    <>
      {isSubmitting && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <div className={styles.mainContainer}>
        <div className={styles.productContainerHeader}>
          <h1>Showing: Aloe Drinks</h1>
        </div>
        {productData.map((product) => (
          <div className={styles.productContainer} key={product.id}>
            <div className={styles.productHeader}>
              <h1>{product.productName}</h1>
              <CartIcon
                className={styles.CartIcon}
                onClick={() => handleOpenAddCart(product)}
              />
            </div>
            <div className={styles.productImage}>
              <img
                src={product.productImage}
                alt={product.productName}
                className={styles.image}
              />
            </div>
            <div className={styles.productDescription}>
              <div className={styles.description}>
                <h1>Price:</h1>
                <h1>{`Ghc${product.productPrice}`}</h1>
              </div>
              <div className={styles.readMore}>
                <button>Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={openAddCart}
        onClose={handleCloseAddCart}
        aria-labelledby="add-to-cart-modal-title"
        aria-describedby="add-to-cart-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="add-to-cart-modal-title">Add to cart</h2>
          <p id="add-to-cart-modal-description">
            Are you sure you want to add this item to your cart and buy later?
          </p>
          <Button onClick={addToCart} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={handleCloseAddCart} variant="outlined" color="secondary">
            Close
          </Button>
        </Box>
      </Modal>

      <NotificationContainer />
    </>
  );
}

export default AloeDrinks;
