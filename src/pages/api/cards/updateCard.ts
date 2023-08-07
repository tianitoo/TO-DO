import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name: string = req.body.name;
  const cardId: number = req.body.cardId;

  if (!name || typeof name !== "string") {
    res.status(404).json({ message: "Invalid card name" });
    return;
  }

  if (!cardId || typeof cardId !== "number") {
    res.status(404).json({ message: `Invalid card id ${cardId}` });
    return;
  }

  const updatedCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      name,
    },
  });

  if (!updatedCard || updatedCard === null || updatedCard === undefined) {
    res.status(400).json({ message: "card not updated" });
    return;
  }
  res.status(200).json(updatedCard);
}
