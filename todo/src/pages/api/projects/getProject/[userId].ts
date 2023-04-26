import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const router = useRouter();
    const { userId } = router.query;
    const project = await prisma.project.findMany({
        where: {
            members: {
                some: {
                    id: Number(userId)
                }
            }
        },
    });
    res.status(200).json(project);
}
