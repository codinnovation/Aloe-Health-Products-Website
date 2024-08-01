import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/header.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import AloeLogo from "../../../public/logo-1.JPG";
import Image from "next/image";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";

function Index({ handleActiveComponent }) {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
    setCartItems(cartArray);
  }, [cartItems]);

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

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(true);
  };

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartArray", JSON.stringify(updatedCartItems));
    toast.success("Item removed from cart");
  };

  const handleBuyItem = (item) => {
    // Handle the buy item logic here
    toast.success(`Bought ${item.productName}`);
  };

  const notifications = [
    {
      id: 1,
      message: "New order received.",
      time: "2 minutes ago",
    },
    {
      id: 2,
      message: "Your item has been shipped.",
      time: "1 hour ago",
    },
  ];

  return (
    <>
      {isButtonClicked && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <div className={styles.headerContainer}>
        <div className={styles.headerContents}>
          <div className={styles.storeNameContainer}>
            <div className={styles.menuIcon}>
              <MenuIcon
                onClick={() => setOpenMenu(true)}
                className={styles.iconMenu}
              />
            </div>
            <div className={styles.headerContainerlogo}>
              <Image src={AloeLogo} alt="Aloe-Logo" width={900} height={900} />
            </div>

            <div className={styles.searchContainer}>
              <input placeholder="Search" />
            </div>
          </div>

          <div className={styles.linkContainer}>
            <div className={styles.link}>
              <HomeIcon className={styles.icon} />
              <h1>Home</h1>
            </div>

            <Tooltip title="Saved Items">
              <div className={styles.link} onClick={handleOpenCart}>
                <div className={styles.numberOfCart}>
                  <h1>{cartItems.length}</h1>
                </div>
                <CartIcon className={styles.icon} />
                <h1>Cart</h1>
              </div>
            </Tooltip>

            <Tooltip title="My Notifications">
              <div className={styles.link} onClick={handleNotificationsClick}>
                <NotificationsIcon className={styles.icon} />
                <h1>News/Update</h1>
              </div>
            </Tooltip>

            <Tooltip title="Contact Us">
              <div className={styles.link}>
                <PhoneIcon className={styles.icon} />
                <h1>Contact</h1>
              </div>
            </Tooltip>

        
          </div>
        </div>

        {openMenu && (
          <>
            <div className={styles.menuContainer}>
              <div className={styles.menuHeader}>
                <h1>Categories</h1>
                <h1 onClick={() => setOpenMenu(false)}>&times;</h1>
              </div>

              <div className={styles.menuNavigations}>
                <div
                  className={styles.link}
                  onClick={() => handleActiveComponent("healthEducation")}
                >
                  <HealthAndSafetyIcon className={styles.linkIcon} />
                  <Link href="">Health Education</Link>
                </div>

                <div
                  className={styles.link}
                  onClick={() => handleActiveComponent("aloeDrinks")}
                >
                  <FreeBreakfastIcon className={styles.linkIcon} />
                  <Link href="">Aloe Drinks</Link>
                </div>

                <div className={styles.link}>
                  <MedicationLiquidIcon className={styles.linkIcon} />
                  <Link href="">Supplements</Link>
                </div>

                <div className={styles.link}>
                  <GroupsIcon className={styles.linkIcon} />
                  <Link href="">Skincare</Link>
                </div>

                <div className={styles.link}>
                  <Person className={styles.linkIcon} />
                  <Link href="">Personal Care</Link>
                </div>

                <div className={styles.link}>
                  <MonitorWeightIcon className={styles.linkIcon} />
                  <Link href="">Weight Management</Link>
                </div>

                <div className={styles.link}>
                  <EmojiNatureIcon className={styles.linkIcon} />
                  <Link href="">Bee Products</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        open={isCartOpen}
        onClose={handleCloseCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxWidth: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" id="modal-modal-title" gutterBottom>
            Your Cart
          </Typography>
          <Divider />

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              marginTop: 2,
            }}
          >
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemAvatar>
                    <Avatar alt={item.productName} src={item.productImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.productName}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.description}
                        </Typography>
                        <br />
                        {item.productPrice}
                      </>
                    }
                  />
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleBuyItem(item)}
                      >
                        Buy
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Your cart is empty.
              </Typography>
            )}
          </List>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              onClick={handleCloseCart}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isNotificationsOpen}
        onClose={handleCloseNotifications}
        aria-labelledby="modal-notifications-title"
        aria-describedby="modal-notifications-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxWidth: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" id="modal-notifications-title" gutterBottom>
            Notifications
          </Typography>
          <Divider />

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              marginTop: 2,
            }}
          >
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem key={notification.id} disablePadding>
                  <ListItemText
                    primary={notification.message}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No new notifications.
              </Typography>
            )}
          </List>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              onClick={handleCloseNotifications}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Index;
