import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Headder from "@/components/Headder";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { MyData } from "@/types/dataType";
import dynamic from "next/dynamic";
import TodoList from "@/components/TodoLists";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>To-Do App</title>
      </Head>
      <div className="font-serif h-screen">
        <Navbar />
        <Headder />
        <TodoList/>
      </div>
    </>
  );
}

