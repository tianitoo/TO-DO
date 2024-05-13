import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = req.body.taskId;

  if (!id || typeof id !== "number") {
    res.status(400).json({ message: "Invalid card id" });
    return;
  }

  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  });

  if (!deletedTask || deletedTask === null || deletedTask === undefined) {
    res.status(400).json({ message: "card not deleted" });
    return;
  }
  res.status(200).json(deletedTask);
}
