import { Card, Task } from "@/types/dataType";
import { Draggable, Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import React from "react";
import CardActions from "./CardActions";

const Cards = (props: {
  card: Card;
  tasks: Task[];
  addTask: (task: string, cardId: string) => void;
  isShowingAddTask: string;
  showAddTask: (cardId: string) => void;
  removeCard: (id: string) => void;
}) => {
  const {
    card,
    tasks,
    addTask,
    isShowingAddTask,
    showAddTask,
    removeCard,
  } = props;

  const [newTask, setNewTask] = React.useState("");

  function handleTaskChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewTask(e.target.value);
  }

  function handleTaskClick(task: string, cardId: string) {
    if (task === "") return;
    addTask(task, cardId);
    setNewTask("");
  }

  const [showActions, setShowActions] = React.useState(false);
  function handleShowActions() {
    if (showActions) {
      setShowActions(false);
    } else {
      setShowActions(true);
    }
  }



  return (
    <>
      <div className="relative">
        <div className="flex px-3 w-fit h-fit">
          <div className="w-64 bg-slate-100 h-fit pb-4 shadow-sm shadow-slate-400 flex-1 rounded-sm justify-start">
            <div className="flex justify-between pr-3 items-center align-middle ">
              <div className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle rounded-md font-bold bg-slate-100">
                {card.title}
              </div>
              <button
                className="w-5 h-5"
                id="button"
                onClick={handleShowActions}
              >
                ...
              </button>
            </div>
            <Droppable droppableId={card.id}>
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
                            className={`on-top w-11/12 text-left p-2 mx-auto my-2 h-auto align-middle break-words 
                            rounded-sm bg-white shadow-sm shadow-slate-500 ${
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
            <div
              className={`flex flex-col w-11/12 text-left h-auto mx-auto align-middle rounded-md text-slate-600 bg-slate-100 ${
                isShowingAddTask === card.id ? "" : "hidden"
              }`}
            >
              <textarea
                name="task"
                onChange={handleTaskChange}
                value={newTask}
                className="w-full h-fit break-words text-left p-2 rounded-md border-2 border-blue-300"
              />
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => {
                    handleTaskClick(newTask, card.id);
                  }}
                  className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-100 hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                >
                  add
                </button>
                <button
                  className="w-1/4 h-8 mt-3 bg-red-600 hover:bg-slate-100 hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                  onClick={() => {
                    showAddTask(card.id);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
            {isShowingAddTask !== card.id ? (
              <div className="w-11/12 text-left p-2 h-auto mx-auto align-middle rounded-md text-slate-600 bg-slate-100">
                <button
                  className="mt-3 px-2 py-1.5 flex items-center text-sm text-center  bg-slate-800 transition duration-300 hover:bg-slate-100 hover:text-stone-800 hover:border border hover:border-slate-800 text-slate-100 rounded-md"
                  onClick={() => showAddTask(card.id)}
                >
                  <span className="text-xl h-auto mr-1">+ </span>
                  Add Task
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <CardActions
          removeCard={removeCard}
          card={card}
          showActions={showActions}
        />
      </div>
    </>
  );
};

export default Cards;
