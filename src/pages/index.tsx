import Navbar from "../components/Navbar";
import Head from "next/head";
import Headder from "@/components/Headder";
import TodoLists from "@/components/TodoLists";
import { use, useEffect, useState } from "react";
import fetshProjectsByUserId from "@/helpers/projects/getProjectsByUserId";
import { Cards, Projects } from "@/types/dataType";
import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Home() {
  // const session = authOptions;
  const { data: session, status } = useSession();

  const Router = useRouter();
  const [projects, setProjects] = useState<Projects[]>([]);
  useEffect(() => {
    const getProjects = async () => {
      const getprojects = await fetshProjectsByUserId(1);
      setProjects(getprojects);
    };
    getProjects();
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <title>To-Do App</title>
      </Head>
      <div className="h-screen">
        <Navbar />
        {session ? (
          <>
            <Headder project={projects[0]} />
            <TodoLists project={projects[0]} />
          </>
        ) : (
          <div className="h-96 flex justify-center items-center">
            <h1 className="text-4xl">Please Login</h1>
          </div>
        )}
        e
        <div
          className="flex justify-center items-center h-16 bg-gray-800 text-white"
          onClick={() => Router.push("/api/auth/signin")}
        >
          <h1>Login</h1>
        </div>
        <div
          className="flex justify-center items-center h-16 bg-gray-800 text-white"
          onClick={() => signOut()}
        >
          <h1>Logout</h1>
        </div>
      </div>
    </>
  );
}
