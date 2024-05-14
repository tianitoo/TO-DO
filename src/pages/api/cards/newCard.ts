import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name: string = req.body.cardName;
  const cardId: string = req.body.cardId;
  const projectId: number = req.body.projectId;

  if (!cardId || typeof cardId !== "string") {
    res.status(404).json({ message: "Invalid card id" });
    return;
  }

  if (!name || typeof name !== "string") {
    res.status(404).json({ message: "Invalid card name" + name });
    return;
  }

  if (!projectId || typeof projectId !== "number") {
    res.status(404).json({ message: `Invalid project id ${projectId}` });
    return;
  }

  const cardOrder = await prisma.card.count({
    where: {
      projectId,
    },
  });

  const newCard = await prisma.card.create({
    data: {
      name,
      cardOrder,
      cardId,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });

  if (!newCard || newCard === null || newCard === undefined) {
    res.status(400).json({ message: "card not created" });
    return;
  }
  res.status(200).json(newCard);
}
