import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { Metadata } from "next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>To-Do App</title>
      </Head>
      <Navbar />
      <div className="font-serif">
        <h1 className="text-6xl text-center mt-32 mx-20 font-bold">
          Responsive FullScreen Navigation Bar Using{" "}
          <span className="text-red-500">Next.js</span> and{" "}
          <span className="text-blue-500">Tailwind</span>
        </h1>
      </div>
    </>
  );
}
