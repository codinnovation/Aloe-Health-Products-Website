import Head from "next/head";
import Welcome from './welcome'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cod Innovations - Official Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <div>
        <Welcome />
      </div>
    </>
  );
}