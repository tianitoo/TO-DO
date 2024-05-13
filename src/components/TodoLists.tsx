import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import type { Cards, MyData, Projects, Tasks } from "@/types/dataType";
import { Card, Project, Task } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { use, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";
import addCard from "@/helpers/cards/addCard";
import AddCardForm from "./ui/AddCardForm";
import TodoCard from "./TodoCard";
import deleteTask from "@/helpers/tasks/removeTask";
import addTask from "@/helpers/tasks/addTask";

// const Cards = dynamic(() => import("@/components/Cards"), { ssr: false });

const TodoLists = (props: { project: Projects }) => {
  const project = props.project;
  const [cards, setCards] = useState<Cards[]>([]);
  const [openAddForm, setOpenAddForm] = useState("");
  const getCards = async () => {
    if (!project) {
      setCards([]);
      return;
    }
    const getCards = await fetshCardsByProjectId(project.id);
    setCards(getCards);
  };
  useEffect(() => {
    getCards();
  }, [project]);

  async function moveTask(
    taskId: number,
    cardId: number,
    content: string,
    index: number
  ) {
    await deleteTask(taskId);
    const newTask = await addTask(content, cardId, index);
    return newTask;
  }
  async function onDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    else {
      const newCards = [...cards];
      const sourceCard: Cards | undefined = newCards.find(
        (card) => card.cardId === source.droppableId
      );
      const destinationCard: Cards | undefined = newCards.find(
        (card) => card.cardId === destination.droppableId
      );
      // console.log(newCards);
      if (!sourceCard || !destinationCard) return;
      // console.log(sourceCard);
      let newTask = sourceCard.tasks[source.index];
      newCards[destinationCard.cardOrder]?.tasks.splice(
        destination.index,
        0,
        newTask
      );
      newCards[sourceCard.cardOrder]?.tasks.splice(source.index, 1);
      newTask = await moveTask(
        newTask.id,
        destinationCard.id,
        newTask.content,
        destination.index
      );
      newCards[destinationCard.cardOrder].tasks[destination.index].id =
        newTask.id;
      setCards(newCards);
      // console.log(cards);
    }
    // console.log(cards);
  }

  function showAddForm(form: string) {
    setOpenAddForm(form);
  }

  return (
    <div className="w-fit">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row justify-start left-0">
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <TodoCard
                  card={card}
                  openAddForm={openAddForm}
                  setOpenAddForm={setOpenAddForm}
                  setCards={setCards}
                />
              </div>
            );
          })}

          <div className="flex px-3 w-fit h-fit text-slate-700">
            <AddCardForm
              openAddForm={openAddForm}
              setOpenAddForm={setOpenAddForm}
              cards={cards}
              project={project}
              setCards={setCards}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoLists;
