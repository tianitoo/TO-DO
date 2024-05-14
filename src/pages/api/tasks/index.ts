import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tasks = await prisma.task.findMany({
    orderBy: {
      taskOrder: "asc",
    },
  });

  if (!tasks || tasks === null || tasks === undefined) {
    res.status(400).json({ message: "tasks not found" });
    return;
  }

  res.status(200).json(tasks);
}
