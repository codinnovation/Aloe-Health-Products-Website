import React, { useState, useEffect } from "react";
import FirstHeader from '../../pages/header'
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import Person from "@mui/icons-material/Person";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import GroupsIcon from "@mui/icons-material/Groups";
import { LogoutRounded } from "@mui/icons-material";
import Layout from "../layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../../firebase.config";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import withSession from "../api/session";
import AloeDrinks from "./aloe-drinks";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [openAddCart, setOpenAddCart] = useState(false);
  const [activeComponent, setActiveComponent] = useState("healthEducation");

  const handleOpenProductDes = () => setOpenProductDescription(true);
  const handleCloseProductDes = () => setOpenProductDescription(false);

  const handleActiveComponent = (active) => {
    setActiveComponent(active);
  };

  const handleOpenAddCart = () => {
    setOpenAddCart(true);
  };
  const handleCloseAddCart = () => {
    setOpenAddCart(false);
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async (e) => {
    setIsButtonClicked(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logout Successful");
        router.push("/login");
        setIsButtonClicked(false);
      } else {
        toast.error("Logout Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    }
  };

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
            <div className={styles.productContainer}>
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
                  alt="product-image"
                  className={styles.video}
                />
              </div>
              <div className={styles.productDescription}>
                <div className={styles.readMore}>
                  <button onClick={handleOpenProductDes}>Read More</button>
                </div>
              </div>
            </div>

            <div className={styles.productContainer}>
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
                  alt="product-image"
                  className={styles.video}
                />
              </div>
              <div className={styles.productDescription}>
                <div className={styles.readMore}>
                  <button onClick={handleOpenProductDes}>Read More</button>
                </div>
              </div>
            </div>

            <div className={styles.productContainer}>
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
                  alt="product-image"
                  className={styles.video}
                />
              </div>
              <div className={styles.productDescription}>
                <div className={styles.readMore}>
                  <button onClick={handleOpenProductDes}>Read More</button>
                </div>
              </div>
            </div>
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
      <FirstHeader handleActiveComponent={handleActiveComponent}/>
      <div className={styles.homeContainer}>
        <div className={styles.homeContents}>
          <div className={styles.categoriesContainer}>
            <div
              className={styles.category}
              onClick={() => handleActiveComponent("healthEducation")}
            >
              <HealthAndSafetyIcon className={styles.catIcon} />
              <h1>Health Education</h1>
            </div>
            <div
              className={styles.category}
              onClick={() => handleActiveComponent("aloeDrinks")}
            >
              <FreeBreakfastIcon className={styles.catIcon} />
              <h1>Aloe Drinks</h1>
            </div>
            <div className={styles.category}>
              <MedicationLiquidIcon className={styles.catIcon} />
              <h1>Supplements</h1>
            </div>
            <div className={styles.category}>
              <GroupsIcon className={styles.catIcon} />
              <h1>Skincare</h1>
            </div>
            <div className={styles.category}>
              <Person className={styles.catIcon} />
              <h1>Personal Care</h1>
            </div>
            <div className={styles.category}>
              <MonitorWeightIcon className={styles.catIcon} />
              <h1>Weight Management</h1>
            </div>
            <div className={styles.category}>
              <EmojiNatureIcon className={styles.catIcon} />
              <h1>Bee Products</h1>
            </div>
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
            <div className={styles.profileEmail}>
              <h1>{user?.user.email}</h1>
            </div>
            <div className={styles.signOut} onClick={handleLogout}>
              <LogoutRounded className={styles.logoutIcon} />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Modal
        open={openAddCart}
        onClose={handleCloseAddCart}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 300 }}>
          <h2 id="child-modal-title">Add to cart</h2>
          <p id="child-modal-description">
            Are you sure to save this item and buy later?
          </p>
          <Button>Add</Button>
          <Button onClick={handleCloseAddCart}>Close</Button>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openProductDescription}
        onClose={handleCloseProductDes}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={styles.productDesContainer}>
          <div className={styles.productDesContainerHeader}>
            <h1>Product Details</h1>
            <h1 onClick={handleCloseProductDes}>Close</h1>
          </div>
          <div className={styles.productDesTextContainer}>
            <div className={styles.productDesText}>
              <h1>Title Here</h1>
              <div className={styles.productDesImage}>
                <img src="/meditation.jpg" alt="product-image" />
              </div>
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

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});
