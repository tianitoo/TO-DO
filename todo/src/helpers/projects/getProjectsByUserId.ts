import { Projects, Users } from "@/types/dataType";
import { Project } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

const fetshProjectsByUserId = async (userId: number) => {
  const res = await fetch("http://localhost:3000/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
    }),
  });
  const data = await res.json();
  console.log(data);
  const projects = [] as Projects[];
  for (const p of data) {
    const members = [] as Users[];
    for (const m of p.members) {
      members.push({
        id: m.id,
        name: m.name,
        email: m.email,
        password: m.password,
        projects: [],
      });
    }
    const project: Projects = {
      id: p.id,
      name: p.name,
      description: p.description,
      members,
      cards: [],
    };
    projects.push(project);
  }
  return projects;
};

export default fetshProjectsByUserId;
