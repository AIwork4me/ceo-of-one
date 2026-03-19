export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export interface TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
