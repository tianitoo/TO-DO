const addCard = async(cardName: string, projectId: number, cardId: string) => {
  const newCard = await fetch("/api/cards/newCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cardName, projectId, cardId }),
  });
  const data = await newCard.json();

  return data;
};

export default addCard;
