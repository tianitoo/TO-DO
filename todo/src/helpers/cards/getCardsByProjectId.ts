import { Cards } from "@/types/dataType";
import { Dispatch, SetStateAction } from "react";

const fetshCardsByProjectId = async (
  projectId: number
) => {
  const res = await fetch("http://localhost:3000/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
    }),
  });
  const data = await res.json();
  const cardData = [] as Cards[];
  data.map((card: Cards) => {
    const newCard = {
      id: card.id,
      cardId: card.cardId,
      name: card.name,
      cardsOrder: card.cardsOrder,
      tasks: card.tasks,
    };
    cardData.push(newCard);
  });
    return cardData;
};

export default fetshCardsByProjectId;
