import Navbar from "../components/Navbar";
import Head from "next/head";
import Headder from "@/components/Headder";
import TodoLists from "@/components/TodoLists";
import { use, useEffect, useState } from "react";
import fetshProjectsByUserId from "@/helpers/projects/getProjectsByUserId";
import { Cards, Projects, Users } from "@/types/dataType";
import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import fetshUserBySession from "@/helpers/users/getUserBySession";
import LoginForm from "@/components/Signin";

export default function Home() {
  // const session = authOptions;
  const { data: session, status } = useSession();

  const Router = useRouter();
  const [projects, setProjects] = useState<Projects[]>([]);
  const [user, setUser] = useState<Users>();
  const getData = async () => {
    if (session) {
      console.log(session);
      if (session.user && session.user.email && session.user.name) {
        const user = await fetshUserBySession(
          session.user.name,
          session.user.email
        );
        setUser(user);
        const projects = await fetshProjectsByUserId(user.id);
        setProjects(projects);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getData();
    }
  }, [session]);

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
            <LoginForm />
          </div>
        )}
      </div>
    </>
  );
}
