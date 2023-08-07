import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function deleteProject(id: number) {
    const project = await prisma.project.delete({
        where: {
            id,
        },
    });
    return project;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id: number = req.body.id;

    if (!id || typeof id !== "number") {
        res.status(400).json({ message: "Invalid project id" });
        return;
    }
    
    const project = await deleteProject(id);
    if (!project || project === null || project === undefined) {
        res.status(404).json({ message: "Project not found" });
        return;
    }

    res.status(200).json(project);
}