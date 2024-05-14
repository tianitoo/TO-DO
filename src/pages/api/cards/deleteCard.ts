import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cardId: string = req.body.cardId;

  if (!cardId || typeof cardId !== "string" || isNaN(parseInt(cardId))) {
    res.status(404).json({ message: `Invalid card id ${cardId}` });
    return;
  }

  const id = parseInt(cardId);

  const deleteTasks = await prisma.task.deleteMany({
    where: {
      cardId: id,
    },
  });

  const deletedCard = await prisma.card.delete({
    where: {
      id,
    },
  });

  if (!deletedCard || deletedCard === null || deletedCard === undefined) {
    res.status(400).json({ message: "card not deleted" });
    return;
  }
  res.status(200).json(deletedCard);
}
