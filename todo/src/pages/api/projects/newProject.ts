import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, membersIds, description } = req.body;
  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Invalid project name" });
    return;
  }
  if (!description || typeof description !== "string") {
    res.status(400).json({ message: "please give a valide description" });
    return;
  }
  if (!membersIds || !Array.isArray(membersIds)) {
    res.status(400).json({ message: "Invalid project members" });
    return;
  }
  const membersId = [] as number[];
  membersIds.forEach((member) => {
    if (typeof parseInt(member) !== "number") {
      res.status(400).json({ message: "Invalid project members" });
      return;
    }
    membersId.push(parseInt(member));
  });
    const newProject = await prisma.project.create({
        data: {
        name: name,
        description: description,
            members: {
                connect: membersId.map((id) => ({ id })),
            },
        },
        include: {
            members: true,
        },
    });
  if (!newProject || newProject === null || newProject === undefined) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  res.status(200).json(newProject);
}
