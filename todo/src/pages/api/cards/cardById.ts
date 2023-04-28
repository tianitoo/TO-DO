import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { cardId } = req.query;

    if (!cardId || typeof cardId !== "string" || isNaN(parseInt(cardId))) {
        res.status(404).json({ message: `Invalid card id ${cardId}` });
        return;
    }

    const id = parseInt(cardId);

    const card = await prisma.card.findUnique({
        where: {
            id,
        },
    });

    if (!card || card === null || card === undefined) {
        res.status(400).json({ message: "card not found" });
        return;
    }
    res.status(200).json(card);
}