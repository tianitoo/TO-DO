export interface Task {
  id: number;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: number[];
}


export interface MyData {
  tasks: { [key: number]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

