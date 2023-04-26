import { Card } from "@/types/dataType";
import React from "react";

const CardActions = (props: {
  removeCard: (cardId: string) => void;
  card: Card;
  showActions: boolean;
}) => {
  const { removeCard, card, showActions } = props;

  return (
    <>
      <div
        className={`absolute left-72 z-50 top-0 h-64 w-64  ${
          showActions ? "" : "hidden"
        }`}
      >
        <button
          className={`w-1/4 h-8 mt-3 bg-red-600 hover:bg-slate-100
          hover:text-stone-800 text-slate-100 shadow-sm
          shadow-slate-800 rounded-md`}
          onClick={() => {
            removeCard(card.id);
          }}
        >
          remove
        </button>
      </div>
    </>
  );
};

export default CardActions;
