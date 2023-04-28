import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content: string = req.body.content;
  const cardId: string = req.body.cardId;

  if (!content || typeof content !== "string") {
    res.status(404).json({ message: "Invalid task content" });
    return;
  }
  if (!cardId || typeof cardId !== "string" || isNaN(parseInt(cardId))) {
    res.status(404).json({ message: `Invalid card id ${cardId}` });
    return;
  }

  const id = parseInt(cardId);

  const taskOrder = await prisma.task.count({
    where: {
      cardId: id,
    },
  });

  const newTask = await prisma.task.create({
    data: {
      content,
      taskOrder,
      card: {
        connect: {
          id,
        },
      },
    },
  });
    
  res.status(200).json(newTask);
}
