import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import withSession from "./api/session";
import HomePage from "../pages/home";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cod Innovations - Official Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HomePage user={user} />
      </div>
    </>
  );
}

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
