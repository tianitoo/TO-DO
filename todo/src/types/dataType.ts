export interface Task {
  id: number;
  content: string;
}

export interface Card {
  id: string;
  title: string;
  taskIds: number[];
}


export interface MyData {
  tasks: { [key: number]: Task };
  cards: { [key: string]: Card };
  cardOrder: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

