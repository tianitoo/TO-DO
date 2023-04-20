import { MyData } from "@/types/dataType";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const Columns = dynamic(() => import("@/components/Columns"), { ssr: false });

const reorderColumnList = (
  column: any,
  startIndex: number,
  endIndex: number
) => {
  const newTaskIds = Array.from(column.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...column,
    taskIds: newTaskIds,
  };
  return newColumn;
};

const myData: MyData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind" },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
    7: { id: 7, content: "Create another page layout" },
    8: { id: 8, content: "Create just create" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 3],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [5],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [6],
    },
    "column-4": {
      id: "column-4",
      title: "COMPLETED",
      taskIds: [2],
    },
    "column-5": {
      id: "column-5",
      title: "COMPLETED",
      taskIds: [4],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

const TodoList = () => {
  const [data, setData] = React.useState(myData);

  const addTask = (task: string, columnId: string) => {
    const newTask = {
      id: Object.keys(data.tasks).length + 1,
      content: task,
    };
    const newTasks = {
      ...data.tasks,
      [newTask.id]: newTask,
    };
    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, newTask.id],
    };
    const newColumns = {
      ...data.columns,
      [newColumn.id]: newColumn,
    };
    setData({ ...data, tasks: newTasks, columns: newColumns });
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = data.columns[source.droppableId];
    const destinationCol = data.columns[destination.droppableId];
    if (sourceCol === destinationCol) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
      return;
    }

    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newSourceCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(destinationCol.taskIds);
    finishTaskIds.splice(destination.index, 0, removed);
    const newDestinationCol = {
      ...destinationCol,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newSourceCol.id]: newSourceCol,
        [newDestinationCol.id]: newDestinationCol,
      },
    };
    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row justify-start left-0">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return (
            <Columns
              key={column.id}
              column={column}
              tasks={tasks}
              addTask={(task: string, columnId: string) =>
                addTask(task, columnId)
              }
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TodoList;
