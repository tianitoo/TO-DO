import { Cards } from "@/types/dataType";
import { Dispatch, SetStateAction } from "react";

const fetshCardsByProjectId = async (projectId: number) => {
  const link = `/api/cards`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
    }),
  });
  const data = await res.json();
  console.log(data);
  const cardData = [] as Cards[];
  data.map((card: Cards) => {
    const newCard = {
      id: card.id,
      cardId: card.cardId,
      name: card.name,
      cardOrder: card.cardOrder,
      tasks: card.tasks || [],
    };
    cardData.push(newCard);
  });
  return cardData;
};

export default fetshCardsByProjectId;
