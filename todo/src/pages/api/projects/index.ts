import { prisma } from "@/lib/prisma";
import { Projects, Users } from "@/types/dataType";
import { Card, Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbProjects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          id: 1,
        },
      },
    },
    include: {
      members: true,
      cards: {
        include: {
          tasks: true,
        },
      },
    },
  });
  if (!dbProjects || dbProjects === null || dbProjects === undefined) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  res.status(200).json(dbProjects);
}
