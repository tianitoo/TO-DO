import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content: string = req.body.content;
  const taskId: string = req.body.taskId;
  const cardId: string = req.body.cardId;

  if (!content || typeof content !== "string") {
    res.status(404).json({ message: "Invalid task content" });
    return;
  }
  if (!taskId || typeof taskId !== "string" || isNaN(parseInt(taskId))) {
    res.status(404).json({ message: `Invalid task id ${taskId}` });
    return;
  }
  if (!cardId || typeof cardId !== "string" || isNaN(parseInt(cardId))) {
    res.status(404).json({ message: `Invalid card id ${cardId}` });
    return;
  }

  const id = parseInt(taskId);
  const cardIdInt = parseInt(cardId);

  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      content,
      card: {
        connect: {
          id: cardIdInt,
        },
      },
    },
  });
  res.status(200).json(updatedTask);
}
