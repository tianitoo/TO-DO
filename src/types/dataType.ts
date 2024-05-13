export interface MyData {
  Projects: Projects[];
}

export interface Projects {
  id: number;
  name: string;
  description?: string;
  members?: Users[];
  cards: Cards[];
}

export interface Cards {
  id: number;
  name: string;
  cardId: string;
  cardOrder: number;
  tasks: Tasks[];
}

export interface Tasks {
  id: number;
  content: string;
  taskOrder: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  projects: Projects[];
}
