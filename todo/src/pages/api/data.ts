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
  const projectAsArray = [] as Projects[];
  projects.forEach((project) => {
    const projectAsObject = {} as Projects;
    projectAsObject.id = project.id;
    projectAsObject.name = project.name;
    const members = [] as Users[];
    project.members.forEach((member) => {
      const memberAsObject = {} as Users;
      memberAsObject.id = member.id;
      memberAsObject.name = member.name || "";
      memberAsObject.email = member.email;
      memberAsObject.password = member.password;
      members.push(memberAsObject);
    });
    projectAsArray.push(projectAsObject);
  });

  return projectAsArray;
}

async function getCardsByProjecId(id: number) {
  const cards = await prisma.card.findMany({
    where: {
      projectId: id,
    },
  });

  const cardsAsArray = [] as Cards[];
  cards.forEach((card) => {
    const cardAsObject = {} as Cards;
    cardAsObject.id = card.id;
    cardAsObject.name = card.name;
    cardAsObject.cardId = Number(card.cardId);
    cardAsObject.cardsOrder = card.cardOrder;
    cardsAsArray.push(cardAsObject);
  });
  return cardsAsArray;
}

async function getTasksByCardId(id: number) {
  const tasks = await prisma.task.findMany({
    where: {
      cardId: id,
    },
  });

  const tasksAsArray = [] as Tasks[];
  tasks.forEach((task) => {
    const taskAsObject = {} as Tasks;
    taskAsObject.id = task.id;
    taskAsObject.content = task.content;
    tasksAsArray.push(taskAsObject);
  });
  return tasksAsArray;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyData>
) {
  const data = {} as MyData;

  const { userId } = req.body;
  const id = Number(userId);

  const projects = await getProjectsByUserId(id);
  for (const project of projects) {
    const cards: Cards[] = await getCardsByProjecId(project.id);
    for (const card of cards) {
      const tasks: Tasks[] = await getTasksByCardId(card.id);
      card.tasks = tasks;
    }
    project.cards = cards;
  }
  data.Projects = projects;
  res.status(200).json(data);
}
