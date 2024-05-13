import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";

const addTask = async (content: string, cardId: number, index: number) => {
  const newTask = await fetch("/api/tasks/newTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, cardId, index }),
  });
  const data = await newTask.json();
  return data;
};

export default addTask;
