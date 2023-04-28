import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Headder from "@/components/Headder";
import TodoLists from "@/components/TodoLists";

export default function Home(props: any) {

  const { data } = props;
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <title>To-Do App</title>
      </Head>
      <div className="font-font h-screen">
        <Navbar />
        <Headder />
        <TodoLists myData={data}/>
      </div>
    </>
  );

  
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

