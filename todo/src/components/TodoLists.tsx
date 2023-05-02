import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import { Cards, MyData, Projects, Tasks } from "@/types/dataType";
import { Card, Project, Task } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";

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

    console.log(result);
    return;
  }

  const [newCard, setNewCard] = useState("");
  function handleCardChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewCard(e.target.value);
  }

  const [isShowingAddCard, setIsShowingAddCard] = React.useState(false);
  function showAddCard() {
    setIsShowingAddCard(!isShowingAddCard);
  }
  return (
    <div className="w-fit">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row justify-start left-0">
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <Cards card={card} />
              </div>
            );
          })}

          <div className="flex px-3 w-fit h-fit text-slate-700">
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
                    <TextArea
                      placeholder="Add a new card"
                      onChange={handleCardChange}
                      value={newCard}
                    />
                    <div className="flex flex-row gap-3">
                      <Button onClick={() => {}} buttonType="primary">
                        Add
                      </Button>
                      <Button onClick={showAddCard} buttonType="danger">
                        cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button onClick={showAddCard} buttonType="primary">
                    Add Card
                  </Button>
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
