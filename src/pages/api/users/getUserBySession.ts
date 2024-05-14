import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ message: "name or email not found" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      name: name,
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({ message: "user not found" });
    return;
  }

  res.status(200).json(user);
}
