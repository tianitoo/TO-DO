import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function updateProject(id: number, name: string) {
    const project = await prisma.project.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
    return project;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const projectId: string  = req.body.id;
    const name: string = req.body.name;
    if (!projectId || typeof projectId !== "string" || isNaN(parseInt(projectId))) {
        res.status(400).json({ message: `Invalid project id ${projectId}` });
        return;
    }

    const id = parseInt(projectId);
    const project = await updateProject(id, name);
    if (!project || project === null || project === undefined) {
        res.status(404).json({ message: "Project not found" });
        return;
    }

    res.status(200).json(project);
}