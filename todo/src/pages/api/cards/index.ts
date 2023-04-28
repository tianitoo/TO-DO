import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cards = await prisma.card.findMany({
        orderBy: {
            cardOrder: "asc",
        }
    });

    if (!cards || cards === null || cards === undefined) {
        res.status(400).json({ message: "cards not found" });
        return;
    }

    res.status(200).json(cards);
}