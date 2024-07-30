import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../../styles/create.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Link from "next/link";
import LogoInLogo from "../../../public/logo-1.JPG";
import Image from "next/image";


function CreateForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    let data = {
      email: userCredentials.email,
      password: userCredentials.password,
    };

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitting(false);
        toast.success("Account created successfully");
        router.push("/");
      } else {
        toast.error("Account creation failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Error occurred while creating account");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Head>
        <title>Aloe Health Products | Create Account</title>
        <link rel="icon" href="/logo-1.JPG" />
      </Head>

      <div className={styles.loginContainer}>
        <div className={styles.loginContents}>
          <div className={styles.loginLogoContainer}>
            <Image src={LogoInLogo} alt="logo-" className={styles.logo} />
          </div>
          <div className={styles.loginContainerHeader}>
            <h2>Create  your account</h2>
          </div>

          <div className={styles.loginForm}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.loginFormInput}>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={userCredentials.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.loginFormInput}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={userCredentials.password}
                  onChange={handleInputChange}
                />
                {showPassword ? (
                  <VisibilityOffOutlined
                    className={styles.visibilityIcon}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <VisibilityOutlinedIcon
                    className={styles.visibilityIcon}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className={styles.loginActions}>
                <Link href="/login">Sign In</Link>
              </div>

              <button type="submit" className={styles.loginButton}>
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateForm;
