import { prisma } from "@/lib/prisma";
import { Tasks } from "@/types/dataType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cardId } = req.body;
  if (!cardId || typeof cardId !== "number") {
    res.status(400).json({ message: "cardId not found" });
    return;
  }

  const tasks = await prisma.task.findMany({
    where: {
      cardId: cardId,
    },
  });

  if (!tasks || tasks === null || tasks === undefined) {
    res.status(400).json({ message: "tasks not found" });
    return;
  }

  const arrayTasks = [] as Tasks[];
  tasks.map((task) => {
    const newTask = {
      id: task.id,
      content: task.content,
      taskOrder: task.taskOrder,
    };
    arrayTasks.push(newTask);
  });

  res.status(200).json(arrayTasks);
}
