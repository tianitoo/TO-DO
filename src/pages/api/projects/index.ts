import prisma from "@/lib/prisma";
import { Projects, Users } from "@/types/dataType";
import { Card, Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  if (!userId || typeof userId !== "number") {
    res.status(400).json({ message: "Invalid user id " + userId });
    return;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!dbUser || dbUser === null || dbUser === undefined) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const dbProjects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      members: true,
      cards: true,
    },
  });
  if (!dbProjects || dbProjects === null || dbProjects === undefined) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  res.status(200).json(dbProjects);
}
