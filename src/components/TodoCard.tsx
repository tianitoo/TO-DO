import { Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import CardActions from "./CardActions";
import type { Cards, Tasks } from "@/types/dataType";
import fetshTasksByCardId from "@/helpers/tasks/getTasksByCardId";
import addTask from "@/helpers/tasks/addTask";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";
import deleteTask from "@/helpers/tasks/removeTask";

const TodoCard = (props: {
  card: Cards;
  openAddForm: string;
  setOpenAddForm: (form: string) => void;
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
}) => {
  const { card, openAddForm, setOpenAddForm, setCards } = props;

  const [tasks, setTasks] = useState<Tasks[]>(card.tasks || []);

  const showAddTask = (cardId: string) => {
    setOpenAddForm(cardId);
  };

  const [newTask, setNewTask] = useState("");

  const handleTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value);
  };

  const handleTaskClick = async (content: string, cardId: number) => {
    if (content === "") return;
    const newTask = await addTask(content, cardId, tasks.length);
    console.log(newTask);
    setCards((prev) => {
      const newCards = [...prev];
      newCards[card.cardOrder].tasks.push(newTask);
      return newCards;
    });
    setNewTask("");
    showAddTask("");
  };

  const [isShowingActions, setIsShowingActions] = useState(false);

  const handleShowActions = () => {
    setIsShowingActions(!isShowingActions);
  };

  return (
    <>
      <div className="relative">
        <div className="flex px-3 w-fit h-fit text-slate-700">
          <div className="w-64 bg-slate-100 h-fit pb-4 shadow-sm shadow-slate-400 flex-1 rounded-sm justify-start">
            <div className="flex justify-between pr-3 items-center align-middle ">
              <div className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle rounded-md font-bold bg-slate-100">
                {card.name}
              </div>
              <button
                className="w-5 h-5"
                id="button"
                onClick={handleShowActions}
              >
                ...
              </button>
            </div>
            <Droppable droppableId={card.cardId}>
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
                            <Button
                              onClick={() => {
                                deleteTask(task.id);
                              }}
                              buttonType="danger"
                            >
                              delete
                            </Button>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
            {openAddForm === card.cardId ? (
              <div
                className={`flex flex-col w-11/12 text-left h-auto mx-auto align-middle rounded-md text-slate-600 bg-slate-100`}
              >
                <TextArea
                  placeholder="What are you doing next?"
                  onChange={handleTaskChange}
                  value={newTask}
                />
                <div className="flex flex-row gap-3">
                  <Button
                    onClick={() => {
                      handleTaskClick(newTask, card.id);
                    }}
                    buttonType="primary"
                  >
                    add
                  </Button>
                  <Button
                    onClick={() => {
                      showAddTask("");
                    }}
                    buttonType="danger"
                  >
                    cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-11/12 text-left p-2 h-auto mx-auto align-middle rounded-md text-slate-600 bg-slate-100">
                <div
                  onClick={() => showAddTask(card.cardId)}
                  className="flex flex-row gap-3"
                ></div>
                <Button
                  onClick={() => showAddTask(card.cardId)}
                  buttonType="primary"
                >
                  <span className="text-xl h-auto mr-1">+ </span>
                  Add Task
                </Button>
              </div>
            )}
          </div>
        </div>
        <CardActions card={card} showActions={isShowingActions} />
      </div>
    </>
  );
};

export default TodoCard;
