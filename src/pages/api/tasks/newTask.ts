import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content: string = req.body.content;
  const cardId: number = req.body.cardId;

  if (!content || typeof content !== "string") {
    res.status(404).json({ message: `Invalid task ${content}` });
    return;
  }

  if (!cardId || typeof cardId !== "number") {
    res.status(404).json({ message: `Invalid cardId ${cardId}` });
    return;
  }

  const taskOrder = await prisma.task.count({
    where: {
      cardId,
    },
  });

  const newTask = await prisma.task.create({
    data: {
      content,
      taskOrder,
      card: {
        connect: {
          id: cardId,
        },
      },
    },
  });
    
  res.status(200).json(newTask);
}
