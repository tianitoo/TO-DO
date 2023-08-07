import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function updateProject(id: number, name: string, description: string) {
    const project = await prisma.project.update({
        where: {
            id,
        },
        data: {
            name,
            description,
        },
    });
    return project;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const projectId: number  = req.body.id;
    const name: string = req.body.name;
    const description: string = req.body.description;
    if (!projectId || typeof projectId !== "number") {
        res.status(400).json({ message: `Invalid project id ${projectId}` });
        return;
    }

    if (!name || typeof name !== "string") {
        res.status(400).json({ message: "Invalid project name" });
        return;
    }

    if (!description || typeof description !== "string") {
        res.status(400).json({ message: "please give a valide description" });
        return;
    }

    const project = await updateProject(projectId, name, description);
    if (!project || project === null || project === undefined) {
        res.status(404).json({ message: "Project not found" });
        return;
    }

    res.status(200).json(project);
}