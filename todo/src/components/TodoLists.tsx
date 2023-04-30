import fetshCardsByProjectId from "@/helpers/cards/getCardsByProjectId";
import { Cards, MyData, Projects, Tasks } from "@/types/dataType";
import { Card, Project, Task } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  function handleCardChange(e: React.ChangeEvent<HTMLTextAreaElement>) {}

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
                {
                  <Cards  card={card} />
                }
              </div>
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
                      // value={newCard}
                      onChange={handleCardChange}
                    ></textarea>
                    <div className="flex flex-row gap-3">
                      <button
                        className="w-1/2 h-8 mt-3 bg-slate-800 hover:bg-slate-10
                        hover:text-stone-800 text-slate-100 shadow-sm shadow-slate-800 
                        ounded-md"
                        onClick={() => {
                          // handleAddClick(newCard);
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
