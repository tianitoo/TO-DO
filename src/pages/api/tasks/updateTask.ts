import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content: string = req.body.content;
  const taskId: string = req.body.taskId;
  const cardId: string = req.body.cardId;
  const index: number = req.body.index;

  if (!content || typeof content !== "string") {
    res.status(404).json({ message: "Invalid task content" });
    return;
  }
  if (typeof taskId !== "number") {
    res.status(404).json({ message: `Invalid task id ${taskId}` });
    return;
  }
  if (typeof cardId !== "number") {
    res.status(404).json({ message: `Invalid card id ${cardId}` });
    return;
  }

  if (typeof index !== "number") {
    res.status(404).json({ message: `Invalid index ${index}` });
    return;
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      content,
      taskOrder: index,
      card: {
        connect: {
          id: cardId,
        },
      },
    },
  });
  res.status(200).json(updatedTask);
}
