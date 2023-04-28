// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import { MyData, Cards, Projects, Tasks, Users } from "@/types/dataType";
import type { NextApiRequest, NextApiResponse } from "next";

async function getProjectsByUserId(id: number) {
  const projects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          id,
        },
      },
    },
    include: {
      members: true,
    },
  });
  return projects;
}

async function getCardsByProjecId(id: number) {
  const cards = await prisma.card.findMany({
    where: {
      projectId: id,
    },
  });
  return cards;
}

async function getTasksByCardId(id: number) {
  const tasks = await prisma.task.findMany({
    where: {
      cardId: id,
    },
  });
  return tasks;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyData>
) {
  const data = {} as MyData;
  const dbProjects = await getProjectsByUserId(1);
  const projects = [] as Projects[];
  for (const dbProject of dbProjects) {
    const project = {} as Projects;
    project.id = dbProject.id;
    project.name = dbProject.name;
    for (const dbMember of dbProject.members) {
      const member = {} as Users;
      if (dbMember.id && dbMember.name) {
        member.id = dbMember.id;
        member.name = dbMember.name;
      }
      project.members.push(member);
    }
    const dbCards = await getCardsByProjecId(dbProject.id);
    const cards = [] as Cards[];
    for (const dbCard of dbCards) {
      const card = {} as Cards;
      card.id = dbCard.id;
      card.name = dbCard.name;
      const dbTasks = await getTasksByCardId(dbCard.id);
      const tasks = [] as Tasks[];
      for (const dbTask of dbTasks) {
        const task = {} as Tasks;
        task.id = dbTask.id;
        task.content = dbTask.content;
        tasks.push(task);
      }
      card.tasks = tasks;
      cards.push(card);
    }
    project.cards = cards;
    projects.push(project);
  }
  data.Projects = projects;
  res.status(200).json(data);
}
