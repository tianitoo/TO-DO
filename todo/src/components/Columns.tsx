import { Column, Task } from "@/types/dataType";
import { Draggable, Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import React from "react";

const Columns = (props: {
  column: Column;
  tasks: Task[];
  addTask: (task: string, columnId: string) => void;
}) => {
  const { tasks } = props;
  const { column } = props;
  const { addTask } = props;
  return (
    <div className="flex px-10 w-fit h-fit">
      <div className="w-64 bg-slate-100 h-fit pb-4 shadow-sm shadow-slate-800 flex-1 rounded-3xl justify-start">
        <div className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle rounded-3xl font-bold bg-slate-100">
          {column.title}
        </div>
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppebleSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => {
                    return (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={`on-top w-11/12 text-left p-2 mx-auto my-2 h-auto align-middle rounded-xl bg-white shadow-sm shadow-slate-500 ${
                          draggableSnapshot.isDragging
                            ? "bg-slate-100 shadow-lg shadow-slate-300"
                            : ""
                        }`}
                      >
                        {task.content}
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="w-11/12 text-left p-2 h-auto mx-auto align-middle rounded-3xl text-slate-600 bg-slate-100">
          <span className="text-xl h-auto">+ </span>
          <button onClick={() => {addTask("tassk", column.id)}}>create new task</button>
        </div>
      </div>
    </div>
  );
};

export default Columns;
