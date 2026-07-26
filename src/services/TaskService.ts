import { Task } from '../models/Task';

let tarefas: Task[] = [];

export const createTask = (title: string): Task => {
  const newTask: Task = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    completed: false,
  };
  tarefas.push(newTask);
  return newTask;
};

export const getTasks = (completed?: string): Task[] => {
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    return tarefas.filter((t) => t.completed === isCompleted);
  }
  return tarefas;
};

export const getTaskById = (id: string): Task | undefined => {
  return tarefas.find((t) => t.id === id);
};

export const updateTask = (id: string, title?: string, completed?: boolean): Task | null => {
  const taskIndex = tarefas.findIndex((t) => t.id === id);
  if (taskIndex === -1) return null;

  const task = tarefas[taskIndex];
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  tarefas[taskIndex] = task;
  return task;
};

export const deleteTask = (id: string): boolean => {
  const taskIndex = tarefas.findIndex((t) => t.id === id);
  if (taskIndex === -1) return false;

  tarefas.splice(taskIndex, 1);
  return true;
};