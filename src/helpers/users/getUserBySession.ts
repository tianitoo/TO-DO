import { Tasks, Users } from "@/types/dataType";
import { Task } from "@prisma/client";

const fetshUserBySession = async (name: string, email: string) => {
  const res = await fetch("/api/users/getUserBySession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });
  const user = await res.json();
  const newUser: Users = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    username: user.username,
    projects: [],
  };
  return newUser;
};

export default fetshUserBySession;
