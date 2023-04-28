import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MyData } from "@/types/dataType";

const Cards = dynamic(() => import("@/components/Cards"), { ssr: false });

const reorderCardList = (card: any, startIndex: number, endIndex: number) => {
  const newTaskIds = Array.from(card.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newCard = {
    ...card,
    taskIds: newTaskIds,
  };
  return newCard;
};

const TodoLists = (props: {myData: MyData}) => {

  const { myData } = props;
  const [data, setData] = React.useState(myData);
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

    const sourceCol = data.Projects[1].cards[source.index];
    const destinationCol = data.Projects[destination.droppableId].cards[destination.index]
    if (sourceCol === destinationCol) {
      const card = reorderCardList(sourceCol, source.index, destination.index);
      const newData = {
        ...data,
        cards: {
          ...data.Projects,
          [card.id]: card,
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
      cards: {
        ...data.cards,
        [newSourceCol.id]: newSourceCol,
        [newDestinationCol.id]: newDestinationCol,
      },
    };
    setData(newData);
  };

  const addTask = async (task: string, cardId: string) => {
    const newTask = {
      id: Object.keys(data.tasks).length + 1,
      content: task,
    };
    const newTasks = {
      ...data.tasks,
      [newTask.id]: newTask,
    };
    const Card = {
      ...data.cards[cardId],
      taskIds: [...data.cards[cardId].taskIds, newTask.id],
    };
    const newCards = {
      ...data.cards,
      [Card.id]: Card,
    };
    setData({ ...data, tasks: newTasks, cards: newCards });

    // console.log(createProject)
  };

  const [isShowingAddTask, setIsShowingAddTask] = React.useState("");
  function showAddTask(id: string) {
    if (isShowingAddTask === id) {
      setIsShowingAddTask("");
    } else setIsShowingAddTask(id);
  }

  const addCard = (name: string) => {
    const newCard = {
      id: `card-${Object.keys(data.cards).length + 1}`,
      title: name,
      taskIds: [],
    };
    const newCards = {
      ...data.cards,
      [newCard.id]: newCard,
    };
    const newCardOrder = [...data.cardOrder, newCard.id];
    setData({ ...data, cards: newCards, cardOrder: newCardOrder });
  };

  const removeCard = (id: string) => {
    const newCards = { ...data.cards };
    delete newCards[id];
    const newCardOrder = data.cardOrder.filter((colId) => colId !== id);
    setData({ ...data, cards: newCards, cardOrder: newCardOrder });
  };

  const [newCard, setNewCard] = useState<string>("");

  function handleCardChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewCard(e.target.value);
  }

  function handleAddClick(newCard: string) {
    if (newCard === "") return;
    addCard(newCard);
    setNewCard("");
    setIsShowingAddCard(false);
  }

  const [isShowingAddCard, setIsShowingAddCard] = React.useState(false);
  function showAddCard() {
    setIsShowingAddCard(!isShowingAddCard);
  }

  return (
    <div className="w-fit">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row justify-start left-0">
          {data.cardOrder.map((cardId) => {
            const card = data.cards[cardId];
            const tasks = card.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Cards
                key={card.id}
                card={card}
                tasks={tasks}
                addTask={(task: string, cardId: string) =>
                  addTask(task, cardId)
                }
                removeCard={(id: string) => removeCard(id)}
                isShowingAddTask={isShowingAddTask}
                showAddTask={showAddTask}
              />
            );
          })}

          <div className="flex px-3 w-fit h-fit">
            <div
              className="w-64 bg-slate-100 h-fit pb-4 shadow-sm sha
            dow-slate-800 flex-1 rounded-md justify-start"
            >
              <div
                className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle 
              rounded-md font-bold bg-slate-100"
              >
                <div className="mb-3">Add New Card </div>
                {isShowingAddCard ? (
                  <>
                    <div className="mb-3 text-sm">Card name</div>
                    <textarea
                      className="w-full h-fit break-words shadow-slate-800 rounded-md border-none 
                      text-left p-2 border-2 border-blue-300"
                      placeholder="Add a new card"
                      value={newCard}
                      onChange={handleCardChange}
                    ></textarea>
                    <div className="flex flex-row gap-3">
                      <button
                        className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-10
                        hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 
                        ounded-md"
                        onClick={() => {
                          handleAddClick(newCard);
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="w-1/4 h-8 mt-3 bg-red-600 hover:bg-slate-100 hover:text-stone-800
                        text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                        onClick={showAddCard}
                      >
                        cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-100 hover:text-stone-800
                    text-slate-100 shadow-sm shadow-slate-800 rounded-md"
                    onClick={showAddCard}
                  >
                    Add card
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
