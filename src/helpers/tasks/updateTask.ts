const updateTask = async (
  taskId: number,
  cardId: number,
  content: string,
  index: number
) => {
  const updateTask = await fetch("/api/tasks/updateTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId, cardId, content, index }),
  });
  const data = await updateTask.json();
  return data;
};

export default updateTask;
