import Head from "next/head";
import { useState, useEffect } from "react";
import Welcome from "./welcome";
import HomePage from "./home";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import styles from "../styles/home-page.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Facebook from "@mui/icons-material/Facebook";
import Email from "@mui/icons-material/Email";
import Twitter from "@mui/icons-material/Twitter"
import WhatsApp from "@mui/icons-material/WhatsApp";


export default function Home() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [openContactContainer, setOpenContactContainer] = useState(false);

  const handleOpenContact = () => {
    setOpenContactContainer((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHomePage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cod Innovations - Official Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <div>
        {showHomePage ? <HomePage /> : <Welcome />}
        <ContactSupportIcon className={styles.contactIcon} onClick={handleOpenContact} />
      </div>

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
    </>
  );
}
