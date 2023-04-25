import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { myData } from "@/data/data";

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

const TodoLists = () => {
  const [data, setData] = React.useState(myData);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    console.log(result);
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

  const [isShowingAddTask, setIsShowingAddTask] = React.useState("");
  function showAddTask(id: string) {
    if (isShowingAddTask === id) {
      setIsShowingAddTask("");
    } else setIsShowingAddTask(id);
  }

  const addColumn = (name: string) => {
    const newColumn = {
      id: `column-${Object.keys(data.columns).length + 1}`,
      title: name,
      taskIds: [],
    };
    const newColumns = {
      ...data.columns,
      [newColumn.id]: newColumn,
    };
    const newColumnOrder = [...data.columnOrder, newColumn.id];
    setData({ ...data, columns: newColumns, columnOrder: newColumnOrder });
  };

  const removeColumn = (id: string) => {
    const newColumns = { ...data.columns };
    delete newColumns[id];
    const newColumnOrder = data.columnOrder.filter((colId) => colId !== id);
    setData({ ...data, columns: newColumns, columnOrder: newColumnOrder });
  };

  const [newColumn, setNewColumn] = useState<string>("");

  function handleColumnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewColumn(e.target.value);
  }

  function handleAddClick(newColumn: string) {
    if (newColumn === "") return;
    addColumn(newColumn);
    setNewColumn("");
    setIsShowingAddColumn(false);
  }

  const [isShowingAddColumn, setIsShowingAddColumn] = React.useState(false);
  function showAddColumn() {
    setIsShowingAddColumn(!isShowingAddColumn);
  }

  return (
    <div className="w-fit">
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
              removeColumn={(id: string) => removeColumn(id)}
              isShowingAddTask={isShowingAddTask}
              showAddTask={showAddTask}
            />
          );
        })}

        <div className="flex px-3 w-fit h-fit">
          <div className="w-64 bg-slate-100 h-fit pb-4 shadow-sm shadow-slate-800 flex-1 rounded-md justify-start">
            <div className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle rounded-md font-bold bg-slate-100">
              <div className="mb-3">Add New Column</div>
              {isShowingAddColumn ? (
                <>
                  <div className="mb-3 text-sm">Column name</div>
                  <textarea
                    className="w-full h-fit break-words shadow-slate-800 rounded-md border-none text-left p-2 border-2 border-blue-300"
                    placeholder="Add a new column"
                    value={newColumn}
                    onChange={handleColumnChange}
                  ></textarea>
                  <div className="flex flex-row gap-3">
                    <button
                      className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-100 hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                      onClick={() => {
                        handleAddClick(newColumn);
                      }}
                    >
                      Add
                    </button>
                    <button
                      className="w-1/4 h-8 mt-3 bg-red-600 hover:bg-slate-100 hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                      onClick={showAddColumn}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-100 hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                  onClick={showAddColumn}
                >
                  Add column
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
        
    </div>
  );
};

export default TodoLists;
