import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import Person from "@mui/icons-material/Person";
import SpaIcon from "@mui/icons-material/Spa";
import DeckIcon from "@mui/icons-material/Deck";
import ComputerIcon from "@mui/icons-material/Computer";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DiamondIcon from "@mui/icons-material/Diamond";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MoreIcon from "@mui/icons-material/More";
import { LogoutRounded } from "@mui/icons-material";
import Layout from "../layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, get, onValue } from "firebase/database";
import { auth, db } from "../../../firebase.config";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import VideoIcon from "@mui/icons-material/OndemandVideo";
import withSession from "../api/session";
import VideoHealthTips from "./videoHealthTips";
import AnotherComponent from "./anotherComponent";

const style = {
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
  const [activeComponent, setActiveComponent] = useState("initialPage");

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
      case "videoHealthTips":
        return <VideoHealthTips />;
      case "anotherComponent":
        return <AnotherComponent />;
      default:
        return (
          <div className={styles.mainContainer}>
            <div className={styles.productContainerHeader}>
              <h1>Showing: Aloe Products</h1>
            </div>
            {productData.map((product, index) => (
              <div className={styles.productContainer} key={index}>
                <div className={styles.productHeader}>
                  <h1>{product.title}</h1>
                  <CartIcon
                    className={styles.CartIcon}
                    onClick={handleOpenAddCart}
                  />
                </div>
                <div className={styles.productImage}>
                  <img
                    src={product.productImage}
                    alt="product-image"
                    className={styles.image}
                    width={900}
                    height={900}
                  />
                </div>
                <div className={styles.productDescription}>
                  <div className={styles.description}>
                    <h1>Price:</h1>
                    <h1>{product.productPrice}</h1>
                  </div>
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
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Layout />
      <div className={styles.homeContainer}>
        <div className={styles.homeContents}>
          <div className={styles.categoriesContainer}>
            <div
              className={styles.category}
              onClick={() => handleActiveComponent("initialPage")}
            >
              <SpaIcon className={styles.catIcon} />
              <h1>Health & Wellness</h1>
            </div>
            <div className={styles.category}>
              <DeckIcon className={styles.catIcon} />
              <h1>Skincare</h1>
            </div>
            <div className={styles.category}>
              <ComputerIcon className={styles.catIcon} />
              <h1>Hair Care</h1>
            </div>
            <div className={styles.category}>
              <FoodBankIcon className={styles.catIcon} />
              <h1>Personal Care</h1>
            </div>
            <div className={styles.category}>
              <DiamondIcon className={styles.catIcon} />
              <h1>Specialty Products</h1>
            </div>
            <div className={styles.category}>
              <FitnessCenterIcon className={styles.catIcon} />
              <h1>Supplements</h1>
            </div>
            <div
              className={styles.category}
              onClick={() => handleActiveComponent("videoHealthTips")}
            >
              <VideoIcon className={styles.catIcon} />
              <h1>Health Tips</h1>
            </div>
            <div
              className={styles.category}
              onClick={() => handleActiveComponent("anotherComponent")}
            >
              <MoreIcon className={styles.catIcon} />
              <h1>Another Component</h1>
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
        onClose={handleOpenAddCart}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
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
              <div className={styles.productDesTextTitle}>
                <p>
                  To relax in the bedroom with the sunshine. Dream your dream
                  with Hikers. Suitable for the bedroom, refused to boring life.
                  Simple sense of lines, interpretation of modern home
                  aesthetics, elegant and outstanding. House has the boundary
                  however love is endless. Parents are happy for happy kids. Get
                  closer with your family by one unit Hikers LED TV.
                </p>
              </div>
            </div>

            <div className={styles.productDesText}>
              <h1>Title Here</h1>
              <div className={styles.productDesTextTitle}>
                <p>
                  To relax in the bedroom with the sunshine. Dream your dream
                  with Hikers. Suitable for the bedroom, refused to boring life.
                  Simple sense of lines, interpretation of modern home
                  aesthetics, elegant and outstanding. House has the boundary
                  however love is endless. Parents are happy for happy kids. Get
                  closer with your family by one unit Hikers LED TV.
                </p>
              </div>
            </div>

            <div className={styles.productDesText}>
              <h1>Title Here</h1>
              <div className={styles.productDesTextTitle}>
                <p>
                  To relax in the bedroom with the sunshine. Dream your dream
                  with Hikers. Suitable for the bedroom, refused to boring life.
                  Simple sense of lines, interpretation of modern home
                  aesthetics, elegant and outstanding. House has the boundary
                  however love is endless. Parents are happy for happy kids. Get
                  closer with your family by one unit Hikers LED TV.
                </p>
              </div>
            </div>

            <div className={styles.productDesText}>
              <h1>Title Here</h1>
              <div className={styles.productDesTextTitle}>
                <p>
                  To relax in the bedroom with the sunshine. Dream your dream
                  with Hikers. Suitable for the bedroom, refused to boring life.
                  Simple sense of lines, interpretation of modern home
                  aesthetics, elegant and outstanding. House has the boundary
                  however love is endless. Parents are happy for happy kids. Get
                  closer with your family by one unit Hikers LED TV.
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {activeComponent === "videoHealthTips" && <VideoHealthTips />}
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }
  return {
    props: {
      user: user,
    },
  };
});
