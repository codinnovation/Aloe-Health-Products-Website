import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import Person from "@mui/icons-material/Person";
import SpaIcon from "@mui/icons-material/Spa";
import DeckIcon from "@mui/icons-material/Deck";
import ComputerIcon from "@mui/icons-material/Computer";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DiamondIcon from "@mui/icons-material/Diamond";
import RadioIcon from "@mui/icons-material/Radio";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MoreIcon from "@mui/icons-material/More";
import { LogoutRounded } from "@mui/icons-material";
import Layout from "../layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, push, get } from "firebase/database";
import { auth, db } from "../../../firebase.config";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        router.push("/login");
      }
    };

    fetchUser(); // Invoke fetchUser function when component mounts
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
            <div className={styles.category}>
              <SpaIcon className={styles.catIcon} />
              <h1>Health & Beauty</h1>
            </div>

            <div className={styles.category}>
              <DeckIcon className={styles.catIcon} />
              <h1>Home & Office</h1>
            </div>

            <div className={styles.category}>
              <ComputerIcon className={styles.catIcon} />
              <h1>Computing</h1>
            </div>

            <div className={styles.category}>
              <FoodBankIcon className={styles.catIcon} />
              <h1>Supermarket</h1>
            </div>

            <div className={styles.category}>
              <DiamondIcon className={styles.catIcon} />
              <h1>Fashion</h1>
            </div>

            <div className={styles.category}>
              <RadioIcon className={styles.catIcon} />
              <h1>Electronics</h1>
            </div>

            <div className={styles.category}>
              <FitnessCenterIcon className={styles.catIcon} />
              <h1>Sporting Goods</h1>
            </div>

            <div className={styles.category}>
              <MoreIcon className={styles.catIcon} />
              <h1>Other Categories</h1>
            </div>
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.productContainer}>
              <div className={styles.productHeader}>
                <h1>Jordan 9 Retro</h1>
                <CartIcon className={styles.CartIcon} onClick={handleOpen} />
              </div>

              <div className={styles.productImage}>
                <Image
                  src="/jordan.jpg"
                  alt="product-image"
                  className={styles.image}
                  width={900}
                  height={900}
                />
              </div>

              <div className={styles.productDescription}>
                <div className={styles.description}>
                  <h1>Price:</h1>
                  <h1>Ghc 260.00</h1>
                </div>

                <div className={styles.description}>
                  <h1>Description:</h1>
                  <h1>41, 54, 23, 56, 76</h1>
                </div>
              </div>
            </div>

            <div className={styles.productContainer}>
              <div className={styles.productHeader}>
                <h1>Lenovo ThinkPad</h1>
                <CartIcon className={styles.CartIcon} onClick={handleOpen}/>
              </div>

              <div className={styles.productImage}>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/cod-shop-c1874.appspot.com/o/fridge.jpg?alt=media&token=3f4eabb5-a3a0-4d7e-a1cb-a77a3627d3cd"
                  alt="product-image"
                  className={styles.image}
                  width={900}
                  height={900}
                />
              </div>

              <div className={styles.productDescription}>
                <div className={styles.description}>
                  <h1>Price:</h1>
                  <h1>Ghc 260.00</h1>
                </div>

                <div className={styles.description}>
                  <h1>Description:</h1>
                  <h1>i7-8650U, 16GB RAM, 500GB SSD, </h1>
                </div>
              </div>
            </div>

            <div className={styles.productContainer}>
              <div className={styles.productHeader}>
                <h1>Bronze Tone Lotion - 300ml</h1>
                <CartIcon className={styles.CartIcon} onClick={handleOpen}/>
              </div>

              <div className={styles.productImage}>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/cod-shop-c1874.appspot.com/o/Bronze-Maxi-Tone-Lotion-200ml.png?alt=media&token=28cbe6ad-c69b-4b8e-9d38-0f7e2df9295a"
                  alt="product-image"
                  className={styles.image}
                  width={900}
                  height={900}
                />
              </div>

              <div className={styles.productDescription}>
                <div className={styles.description}>
                  <h1>Price:</h1>
                  <h1>Ghc 30.00</h1>
                </div>

                <div className={styles.description}>
                  <h1>Description:</h1>
                  <h1>Bronze Tone Lotion - 300ml</h1>
                </div>
              </div>
            </div>
            <div className={styles.item}></div>
          </div>
          <div className={styles.profileContainer}>
            <div className={styles.profilePhoto}>
              <Person className={styles.photo} />
            </div>
            <div className={styles.profileName}>
              <h1>Kwabena Sakyi Asumadu</h1>
            </div>

            <div className={styles.profileEmail}>
              <h1>{user?.user.email}</h1>
            </div>

            <div className={styles.profileCountry}>
              <h1>{user?.user.phoneNumber}</h1>
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
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Save Items</h2>
          <p id="child-modal-description">
            Are you sure to save this item and buy later?
          </p>
          <Button>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}

export default Index;
