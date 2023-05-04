import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import { Cards, MyData, Projects, Tasks } from "@/types/dataType";
import { Card, Project, Task } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";
import addCard from "@/helpers/cards/addCard";
import AddCardForm from "./ui/AddCardForm";

const Cards = dynamic(() => import("@/components/Cards"), { ssr: false });

const TodoLists = (props: { project: Projects }) => {
  const project = props.project;

  const [cards, setCards] = useState<Cards[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const getCards = await fetshCardsByProjectId(project.id);
      setCards(getCards);
    };
    project && getCards();
  }, [project]);

  function onDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    return;
  }

  const [openAddForm, setOpenAddForm] = useState("");
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
                <Cards
                  card={card}
                  openAddForm={openAddForm}
                  setOpenAddForm={setOpenAddForm}
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
