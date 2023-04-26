import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const project = await prisma.project.create({
        data: {
            name: "My new project",
            members: {
                connect: {
                    id: 1
                }
            }
        },
    });
    res.status(200).json(project);
}
