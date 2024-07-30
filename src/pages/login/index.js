import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, db } from "../../../firebase.config";
import { ref, get } from "firebase/database";
import LogoInLogo from "../../../public/logo-1.JPG";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import Cookies from "js-cookie";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const router = useRouter();

  console.log(verifiedUser)

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = ref(db, "users"); // Adjust the path if needed
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const users = snapshot.val();
          // Map through the users and check for a match
          for (const key in users) {
            if (users[key].email === userCredentials.email) {
              setVerifiedUser({ ...users[key], key });
              break;
            }
          }
        }
      } catch (error) {
        toast.error("Error fetching users from database");
      }
    };

    if (userCredentials.email) {
      fetchUsers();
    }
  }, [userCredentials.email]);

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.user) {
          Cookies.set("user", JSON.stringify(result.user), { expires: 1 }); // Expires in 1 day
          toast.success("Login successful");
          setIsSubmitting(false);
          router.push("/home");
        } else {
          toast.error("Login Failed");
          setIsSubmitting(false);
        }
      } else {
        toast.error("Login Failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async () => {
    if (!userCredentials.email) {
      toast.error("Please enter your email address");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, userCredentials.email);
      toast.success("Password reset email sent. Please check your email.");
    } catch (error) {
      toast.error("Error sending password reset email");
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
        <title>Aloe Health Products | Sign In</title>
        <link rel="icon" href="/logo-1.JPG" />
      </Head>

      <div className={styles.authContainer}>
        <div className={styles.authItems}>
          <div className={styles.logoContainer}>
            <Image src={LogoInLogo} alt="logo-" className={styles.logo} />
          </div>
          <div className={styles.authLogin}>
            <h2>Login to your account</h2>
          </div>

          <div className={styles.authForm}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.authFormInput}>
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

              <div className={styles.authFormInput}>
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

              <div className={styles.authForgetPassword}>
                <a onClick={resetPassword}>Forget Password</a>
                <Link href="/create">Create Account</Link>
              </div>

              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginForm;
