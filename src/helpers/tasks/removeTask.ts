const deleteTask = async (taskId: number) => {
  const deleteTask = await fetch("/api/tasks/deleteTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });
  const data = await deleteTask.json();
  return data;
};

export default deleteTask;
