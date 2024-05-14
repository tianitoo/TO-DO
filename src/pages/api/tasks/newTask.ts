import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content: string = req.body.content;
  const cardId: number = req.body.cardId;
  const index: number = req.body.index;
  if (!content || typeof content !== "string") {
    res.status(404).json({ message: `Invalid task ${content}` });
    return;
  }

  if (!cardId || typeof cardId !== "number") {
    res.status(404).json({ message: `Invalid cardId ${cardId}` });
    return;
  }

  console.log("here" + index + " " + typeof index);
  if (typeof index !== "number") {
    res.status(404).json({ message: `Invalid index ${index}` });
    return;
  }

  const taskOrder = index;
  const updateTaskOrder = await prisma.task.updateMany({
    where: {
      cardId: cardId,
      taskOrder: {
        gte: index,
      },
    },
    data: {
      taskOrder: {
        increment: 1,
      },
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
