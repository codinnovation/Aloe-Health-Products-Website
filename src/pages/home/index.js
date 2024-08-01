import React, { useState, useEffect } from "react";
import FirstHeader from "../../pages/header";
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import Person from "@mui/icons-material/Person";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import GroupsIcon from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase.config";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import AloeDrinks from "./aloe-drinks";

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

function Index() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [productData, setProductData] = useState([]);
  const [openProductDescription, setOpenProductDescription] = useState(false);
  const [openAddCart, setOpenAddCart] = useState(false);
  const [activeComponent, setActiveComponent] = useState("healthEducation");

  const handleOpenProductDes = () => setOpenProductDescription(true);
  const handleCloseProductDes = () => setOpenProductDescription(false);

  const handleOpenAddCart = () => setOpenAddCart(true);
  const handleCloseAddCart = () => setOpenAddCart(false);

  const handleActiveComponent = (active) => setActiveComponent(active);

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

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "aloeDrinks":
        return <AloeDrinks />;
      default:
        return (
          <div className={styles.mainContainer}>
            <div className={styles.productContainerHeader}>
              <h1>Showing: Health Education</h1>
            </div>
            {Array(3).fill().map((_, index) => (
              <div className={styles.productContainer} key={index}>
                <div className={styles.productHeader}>
                  <h1>Title Goes Here</h1>
                  <CartIcon
                    className={styles.CartIcon}
                    onClick={handleOpenAddCart}
                  />
                </div>
                <div className={styles.productImage}>
                  <video
                    src="/health-video.mp4"
                    controls
                    className={styles.video}
                  />
                </div>
                <div className={styles.productDescription}>
                  <div className={styles.readMore}>
                    <button onClick={handleOpenProductDes}>Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <>
      {isButtonClicked && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <FirstHeader handleActiveComponent={handleActiveComponent} />
      <div className={styles.homeContainer}>
        <div className={styles.homeContents}>
          <div className={styles.categoriesContainer}>
            {[
              { name: "Health Education", icon: <HealthAndSafetyIcon /> },
              { name: "Aloe Drinks", icon: <FreeBreakfastIcon /> },
              { name: "Supplements", icon: <MedicationLiquidIcon /> },
              { name: "Skincare", icon: <GroupsIcon /> },
              { name: "Personal Care", icon: <Person /> },
              { name: "Weight Management", icon: <MonitorWeightIcon /> },
              { name: "Bee Products", icon: <EmojiNatureIcon /> }
            ].map((category, index) => (
              <div
                className={styles.category}
                key={index}
                onClick={() => handleActiveComponent(category.name.toLowerCase().replace(" ", ""))}
              >
                {React.cloneElement(category.icon, { className: styles.catIcon })}
                <h1>{category.name}</h1>
              </div>
            ))}
          </div>
          <div className={styles.activeComponent}>
            {renderActiveComponent()}
          </div>
          <div className={styles.profileContainer}>
            <div className={styles.profilePhoto}>
              <Person className={styles.photo} />
            </div>
            <div className={styles.profileName}>
              <h1>Welcome To Aloe Health Products</h1>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Modal
        open={openAddCart}
        onClose={handleCloseAddCart}
        aria-labelledby="add-to-cart-modal-title"
        aria-describedby="add-to-cart-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="add-to-cart-modal-title">Add to cart</h2>
          <p id="add-to-cart-modal-description">
            Are you sure you want to save this item and buy later?
          </p>
          <Button variant="contained" color="primary" onClick={() => toast.success("Added to cart!")}>Add</Button>
          <Button variant="outlined" color="secondary" onClick={handleCloseAddCart}>Close</Button>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openProductDescription}
        onClose={handleCloseProductDes}
        aria-labelledby="product-description-modal-title"
        aria-describedby="product-description-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={styles.productDesContainerHeader}>
            <h1 id="product-description-modal-title">Product Details</h1>
            <h1 onClick={handleCloseProductDes} style={{ cursor: 'pointer' }}>Close</h1>
          </div>
          <div className={styles.productDesTextContainer}>
            <div className={styles.productDesText}>
              <h1>Title Here</h1>
              <div className={styles.productDesImage}></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                necessitatibus, commodi exercitationem atque labore dicta ipsum,
                error corrupti, accusamus fugiat veniam incidunt.
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Index;
