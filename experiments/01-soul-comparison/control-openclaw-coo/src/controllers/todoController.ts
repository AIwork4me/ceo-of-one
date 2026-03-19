import { Request, Response, NextFunction } from 'express';
import { todoStore } from '../store/todoStore';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo';
import { ValidationError, NotFoundError } from '../middleware/errorHandler';

export const getAllTodos = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const todos = todoStore.findAll();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id as string;
    const todo = todoStore.findById(id);
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { title } = req.body as CreateTodoDto;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new ValidationError('Title is required and must be a non-empty string');
    }

    const todo = todoStore.create({ title: title.trim() });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id as string;
    const { title, completed } = req.body as UpdateTodoDto;

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      throw new ValidationError('Title must be a non-empty string');
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      throw new ValidationError('Completed must be a boolean');
    }

    const updateData: UpdateTodoDto = {};
    if (title !== undefined) {
      updateData.title = title.trim();
    }
    if (completed !== undefined) {
      updateData.completed = completed;
    }

    const todo = todoStore.update(id, updateData);
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id as string;
    const deleted = todoStore.softDelete(id);
    if (!deleted) {
      throw new NotFoundError('Todo not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
