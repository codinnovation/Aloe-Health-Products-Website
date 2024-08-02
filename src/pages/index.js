import Head from "next/head";
import { useState, useEffect } from "react";
import Welcome from "./welcome";
import HomePage from "./home";

export default function Home() {
  const [showHomePage, setShowHomePage] = useState(false);

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
      </div>
    </>
  );
}
