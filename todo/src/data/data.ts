import { MyData } from "../types/dataType";

export const myData: MyData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind" },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
    7: { id: 7, content: "Create another page layout" },
    8: { id: 8, content: "Create just create" },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    "card-2": {
      id: "card-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
  },
  cardOrder: ["card-1", "card-2"],
};
