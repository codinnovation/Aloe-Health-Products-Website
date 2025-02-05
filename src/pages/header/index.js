import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/header.module.css";
import {
  Home as HomeIcon,
  AddShoppingCart as CartIcon,
  Notifications as NotificationsIcon,
  Phone as PhoneIcon,
  Menu as MenuIcon,
  Person,
  MedicationLiquid as MedicationLiquidIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  MonitorWeight as MonitorWeightIcon,
  Groups as GroupsIcon,
  EmojiNature as EmojiNatureIcon,
  FreeBreakfast as FreeBreakfastIcon,
} from "@mui/icons-material";
import {
  Tooltip,
  Modal,
  Button,
  Box,
  CircularProgress,
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";
import Image from "next/image";
import AloeLogo from "../../../public/logo-1.JPG";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Facebook from "@mui/icons-material/Facebook";
import Email from "@mui/icons-material/Email";
import Twitter from "@mui/icons-material/Twitter"
import WhatsApp from "@mui/icons-material/WhatsApp";

function Index({ handleActiveComponent }) {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [submitCart, setSubmitCart] = useState(false);
  const [openContactContainer, setOpenContactContainer] = useState(false);

  const handleOpenContact = () => {
    setOpenContactContainer((prev) => !prev);
  };


  useEffect(() => {
    const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
    setCartItems(cartArray);
  }, []);


  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartArray", JSON.stringify(updatedCartItems));
    toast.success("Item removed from cart");
  };

  const handleBuyItem = (item) => {
    toast.success(`Bought ${item.productName}`);
  };

  const notifications = [
    { id: 1, message: "New order received.", time: "2 minutes ago" },
    { id: 2, message: "Your item has been shipped.", time: "1 hour ago" },
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
              <div className={styles.link} onClick={() => setIsCartOpen(true)}>
                <div className={styles.numberOfCart}>
                  <h1>{cartItems.length}</h1>
                </div>
                <CartIcon className={styles.icon} />
                <h1>Cart</h1>
              </div>
            </Tooltip>
            <Tooltip title="My Notifications">
              <div
                className={styles.link}
                onClick={() => setIsNotificationsOpen(true)}
              >
                <NotificationsIcon className={styles.icon} />
                <h1>Notifications</h1>
              </div>
            </Tooltip>
            <Tooltip title="Contact Us">
              <div className={styles.link} onClick={handleOpenContact}>
                <PhoneIcon className={styles.icon} />
                <h1>Contact</h1>
              </div>
            </Tooltip>
          </div>
        </div>

        {openMenu && (
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
        )}
      </div>

      <Modal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        aria-labelledby="modal-modal-title"
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
                  <Grid container spacing={2} style={{marginLeft: "10px"}}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSubmitCart(true)}
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
              onClick={() => setIsCartOpen(false)}
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
        onClose={() => setIsNotificationsOpen(false)}
        aria-labelledby="modal-notifications-title"
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
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.time}
                      </Typography>
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
              onClick={() => setIsNotificationsOpen(false)}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={submitCart} onClose={() => setSubmitCart(false)}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
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
          noValidate
          autoComplete="off"
        >
          <TextField id="filled-basic" label="Name" variant="filled" />
          <TextField id="filled-basic" label="Phone" variant="filled" />
          <TextField id="filled-basic" label="Location" variant="filled" />
          <Button>Buy</Button>
        </Box>
      </Modal>



      <Modal
        open={openContactContainer}
        onClose={handleOpenContact}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.contactBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contact Support
          </Typography>

          <div className={styles.contactInfo}>
            <div className={styles.info}>
              <Facebook className={styles.icon}/>
              <h1>facebook acocunt here</h1>
            </div>

            <div className={styles.info}>
              <Email className={styles.icon}/>
              <h1>emailaccount@gmail.com</h1>
            </div>

            <div className={styles.info}>
              <WhatsApp className={styles.icon}/>
              <h1>+233597034532</h1>
            </div>

            <div className={styles.info}>
              <Twitter className={styles.icon}/>
              <h1>twitteraccount here</h1>
            </div>
          </div>
         
        </Box>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Index;
