import React, { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import { Cards } from "@/types/dataType";
import addCard from "@/helpers/cards/addCard";

const AddCardForm = (props: {
  cards: Cards[];
  openAddForm: string;
  setOpenAddForm: (form: string) => void;
  project: { id: number };
  setCards: (cards: Cards[]) => void;
}) => {
  const { cards, openAddForm, setOpenAddForm, project, setCards } = props;

  const showAddForm = (cardId: string) => {
    setOpenAddForm(cardId);
  };

  const handleNewCard = async (cardName: string) => {
    if (cardName === "") return;
    const cardId = cards.length + 1;
    const newCard = await addCard(cardName, project.id, `card-${cardId}`);
    setCards([...cards, newCard]);
    setNewCard("");
  };

  const [newCard, setNewCard] = useState("");
  function handleCardChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewCard(e.target.value);
  }
  return (
    <div className="w-64 bg-slate-100 h-fit pb-4 shadow-sm shadow-slate-400 flex-1 rounded-md justify-start">
      <div
        className="w-11/12 text-left pt-2 pl-2 h-auto mx-auto align-middle 
              rounded-md font-bold bg-slate-100"
      >
        <div className="mb-3">Add New Card </div>
        {openAddForm === "addCard" ? (
          <div className="form">
            <TextArea
              placeholder="Add a new card"
              onChange={handleCardChange}
              value={newCard}
            />
            <div className="flex flex-row gap-3">
              <Button
                onClick={() => handleNewCard(newCard)}
                buttonType="primary"
              >
                Add
              </Button>
              <Button buttonType="danger" onClick={() => setOpenAddForm("")}>
                cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => showAddForm("addCard")} buttonType="primary">
            Add Card
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddCardForm;
