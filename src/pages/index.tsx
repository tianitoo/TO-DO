import Navbar from "../components/Navbar";
import Head from "next/head";
import Headder from "@/components/Headder";
import TodoLists from "@/components/TodoLists";
import { useEffect, useState } from "react";
import fetshProjectsByUserId from "@/helpers/projects/getProjectsByUserId";
import { Cards, Projects } from "@/types/dataType";
import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";

export default function Home() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  useEffect(() => {
    const getProjects = async () => {
      const getprojects = await fetshProjectsByUserId(1);
      setProjects(getprojects);
    };
    getProjects();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const getCards = await fetshCardsByProjectId(projects[0].id);
      // console.log(getCards);
      setCards(getCards);
    };
    projects[0] && getCards();
  }, [projects]);

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
        <Headder project={projects[0]} />
        <TodoLists project={projects[0]} cards={cards} setCards={setCards} />
      </div>
    </>
  );
}
