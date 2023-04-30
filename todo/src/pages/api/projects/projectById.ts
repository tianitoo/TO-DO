import { prisma } from "@/lib/prisma";
import { Projects } from "@/types/dataType";
import { NextApiRequest, NextApiResponse } from "next";
import { ProjectReference } from "typescript";

function getProjectById(id: number) {
  const project = prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      members: true,
    },
  });
  if (!project) {
    return {} as Projects;
  }
  return project;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const projectId:number = req.body.id;

  if (!projectId || typeof projectId !== "number") {
    res.status(400).json({ message: "Invalid project id" });
    return;
  }


  const project = await getProjectById(projectId);
  if (!project || project === null || project === undefined) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  const p = {} as Projects;
  p.id = project.id;
  p.name = project.name;
  const members = [] as number[];
  project.members.forEach((member) => {
    members.push(member.id);
  });
  res.status(200).json(project);
}
