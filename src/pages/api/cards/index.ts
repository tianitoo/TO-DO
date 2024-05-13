import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId: number = req.body.projectId;

  if (!projectId || typeof projectId !== "number") {
    res.status(400).json({ message: "Invalid project id" });
    return;
  }
  const cards = await prisma.card.findMany({
    where: {
      projectId,
    },
    orderBy: {
      cardOrder: "asc",
    },
    include: {
      tasks: {
        orderBy: {
          taskOrder: "asc",
        },
      },
    },
  });

  if (!cards || cards === null || cards === undefined) {
    res.status(400).json({ message: "cards not found" });
    return;
  }

  res.status(200).json(cards);
}
