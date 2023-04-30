import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cardId: number = req.body.cardId;

    if (!cardId || typeof cardId !== "number") {
        res.status(400).json({ message: "Invalid card id" });
        return;
    }

    const card = await prisma.card.findUnique({
        where: {
            id: cardId,
        },
    });

    if (!card || card === null || card === undefined) {
        res.status(400).json({ message: "card not found" });
        return;
    }
    res.status(200).json(card);
}