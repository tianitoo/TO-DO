export interface MyData {
  Projects: Projects[];
}

export interface Projects {
  id: number;
  name: string;
  members: Users[];
  cards: Cards[];
}

export interface Cards {
  id: number;
  name: string;
  tasks: Tasks[];
}

export interface Tasks {
  id: number;
  content: string;  
}

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  projects: Projects[];
}

