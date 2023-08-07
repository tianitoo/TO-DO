import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const id: number = req.body.cardId;
    
    if (!id || typeof id !== "number") {
        res.status(400).json({ message: "Invalid card id" });
        return;
    }

    const deletedCard = await prisma.card.delete({
        where: {
            id
        },
        include: {
            tasks: true
        }
    });
    
    if (!deletedCard || deletedCard === null || deletedCard === undefined) {
        res.status(400).json({ message: "card not deleted" });
        return;
    }
    res.status(200).json(deletedCard);
    }