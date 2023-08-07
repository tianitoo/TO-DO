import { Tasks } from "@/types/dataType";
import { Task } from "@prisma/client";

const fetshTasksByCardId = async (cardId: number) => {
  const res = await fetch("/api/tasks/taskByCardId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardId: cardId,
    }),
  });
  const Tasks = [] as Tasks[];
  const data: Tasks[] = await res.json();
  data.map((task: Tasks) => {
    const newTask = {
      id: task.id,
      content: task.content,
      taskOrder: task.taskOrder,
    };
    Tasks.push(newTask);
  });
  return Tasks;
};


export default fetshTasksByCardId;