import { v4 as uuidv4 } from 'uuid';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoResponse } from '../types/todo';

class TodoStore {
  private todos: Map<string, Todo> = new Map();

  create(dto: CreateTodoDto): TodoResponse {
    const now = new Date();
    const todo: Todo = {
      id: uuidv4(),
      title: dto.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    this.todos.set(todo.id, todo);
    return this.toResponse(todo);
  }

  findById(id: string): TodoResponse | null {
    const todo = this.todos.get(id);
    if (!todo || todo.deletedAt !== null) {
      return null;
    }
    return this.toResponse(todo);
  }

  findAll(): TodoResponse[] {
    const result: TodoResponse[] = [];
    for (const todo of this.todos.values()) {
      if (todo.deletedAt === null) {
        result.push(this.toResponse(todo));
      }
    }
    return result;
  }

  update(id: string, dto: UpdateTodoDto): TodoResponse | null {
    const todo = this.todos.get(id);
    if (!todo || todo.deletedAt !== null) {
      return null;
    }
    if (dto.title !== undefined) {
      todo.title = dto.title;
    }
    if (dto.completed !== undefined) {
      todo.completed = dto.completed;
    }
    todo.updatedAt = new Date();
    this.todos.set(id, todo);
    return this.toResponse(todo);
  }

  softDelete(id: string): boolean {
    const todo = this.todos.get(id);
    if (!todo || todo.deletedAt !== null) {
      return false;
    }
    todo.deletedAt = new Date();
    todo.updatedAt = todo.deletedAt;
    this.todos.set(id, todo);
    return true;
  }

  private toResponse(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  }

  clear(): void {
    this.todos.clear();
  }
}

export const todoStore = new TodoStore();
