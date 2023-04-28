import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name: string = req.body.name;
  const projectId: string = req.body.projectId;

  if (!name || typeof name !== "string") {
    res.status(404).json({ message: "Invalid card name" });
    return;
  }
  if (!projectId || typeof projectId !== "string" || isNaN(parseInt(projectId))) {
    res.status(404).json({ message: `Invalid project id ${projectId}` });
    return;
  }

  const id = parseInt(projectId);

  const cardOrder = await prisma.card.count({
    where: {
      projectId: id,
    },
  });

  const newCard = await prisma.card.create({
    data: {
      name,
      cardOrder,
      project: {
        connect: {
          id,
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
