import React, { useState, useEffect } from "react";
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
import SpaIcon from "@mui/icons-material/Spa";
import DeckIcon from "@mui/icons-material/Deck";
import ComputerIcon from "@mui/icons-material/Computer";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DiamondIcon from "@mui/icons-material/Diamond";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AloeLogo from "../../../public/logo-1.JPG";
import Image from "next/image";
import MoreIcon from "@mui/icons-material/More";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

function Index() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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

  const cartItems = [
    {
      id: 1,
      name: "Jordan 9 Retro",
      desrciptions: "This jordan 9 Retro all sizes",
      price: "$12.00",
      image:
        "https://firebasestorage.googleapis.com/v0/b/cod-shop-c1874.appspot.com/o/fridge.jpg?alt=media&token=3f4eabb5-a3a0-4d7e-a1cb-a77a3627d3cd",
    },

    {
      id: 1,
      name: "Jordan 9 Retro",
      desrciptions: "This jordan 9 Retro all sizes",
      price: "$12.00",
      image:
        "https://firebasestorage.googleapis.com/v0/b/cod-shop-c1874.appspot.com/o/fridge.jpg?alt=media&token=3f4eabb5-a3a0-4d7e-a1cb-a77a3627d3cd",
    },

    {
      id: 1,
      name: "Jordan 9 Retro",
      desrciptions: "This jordan 9 Retro all sizes",
      price: "$12.00",
      image:
        "https://firebasestorage.googleapis.com/v0/b/cod-shop-c1874.appspot.com/o/fridge.jpg?alt=media&token=3f4eabb5-a3a0-4d7e-a1cb-a77a3627d3cd",
    },
  ];

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
      <div className={styles.homeContainer}>
        <div className={styles.navigationContainer}>
          <div className={styles.navigationContents}>
            <div className={styles.storeNameContainer}>
              <div className={styles.menuIcon}>
                <MenuIcon onClick={() => setOpenMenu(true)} />
              </div>
              <div className={styles.containerLogo}>
                <Image src={AloeLogo} alt="Aloe-Logo" className={styles.img} />
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
                  <CartIcon className={styles.icon} />
                  <h1>Cart</h1>
                </div>
              </Tooltip>

              <Tooltip title="My Notifications">
                <div className={styles.link} onClick={handleNotificationsClick}>
                  <NotificationsIcon className={styles.icon} />
                  <h1>Notifications</h1>
                </div>
              </Tooltip>

              <Tooltip title="Contact Us">
                <div className={styles.link}>
                  <PhoneIcon className={styles.icon} />
                  <h1>Contact</h1>
                </div>
              </Tooltip>

              <Tooltip title="My Profile">
                <div className={styles.link}>
                  <PersonIcon className={styles.icon} />
                  <h1>Me</h1>
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
                  <div className={styles.link}>
                    <SpaIcon className={styles.linkIcon} />
                    <Link href="">Health & Wellness</Link>
                  </div>


                  <div className={styles.link}>
                    <ComputerIcon className={styles.linkIcon} />
                    <Link href="">Skincare</Link>
                  </div>

                  <div className={styles.link}>
                    <FoodBankIcon className={styles.linkIcon} />
                    <Link href="">Hair Care</Link>
                  </div>

                  <div className={styles.link}>
                    <SpaIcon className={styles.linkIcon} />
                    <Link href="">Personal Care</Link>
                  </div>

                  <div className={styles.link}>
                    <ComputerIcon className={styles.linkIcon} />
                    <Link href="">Speical Products</Link>
                  </div>

                  <div className={styles.link}>
                    <ComputerIcon className={styles.linkIcon} />
                    <Link href="">Suplements</Link>
                  </div>

                  <div className={styles.link}>
                    <ComputerIcon className={styles.linkIcon} />
                    <Link href="">Other Products</Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
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
            {cartItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
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
                      {item.price}
                    </>
                  }
                />
              </ListItem>
            ))}
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
            {notifications.map((notification) => (
              <ListItem key={notification.id} disablePadding>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
              </ListItem>
            ))}
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
    </>
  );
}

export default Index;
