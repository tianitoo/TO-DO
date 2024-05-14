import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const taskId: string = req.body.taskId;

  if (!taskId || typeof taskId !== "string" || isNaN(parseInt(taskId))) {
    res.status(404).json({ message: `Invalid task id ${taskId}` });
    return;
  }

  const id = parseInt(taskId);

  const Task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(Task);
}
