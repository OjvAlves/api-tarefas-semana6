import { Task } from '@prisma/client';
import prisma from '../config/prismaClient';

// Todos os métodos abaixo agora são assíncronos (async/await) porque toda
// operação de banco de dados é uma operação de I/O (entrada/saída) — o Node.js
// não trava esperando o MySQL responder, ele libera a thread e retoma quando
// a Promise é resolvida.

export const createTask = async (title: string): Promise<Task> => {
  return prisma.task.create({
    data: { title },
  });
};

export const getTasks = async (completed?: string): Promise<Task[]> => {
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    return prisma.task.findMany({ where: { completed: isCompleted } });
  }
  return prisma.task.findMany();
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  return prisma.task.findUnique({ where: { id } });
};

export const updateTask = async (
  id: string,
  title?: string,
  completed?: boolean
): Promise<Task | null> => {
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) return null;

  return prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    },
  });
};

export const deleteTask = async (id: string): Promise<boolean> => {
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) return false;

  await prisma.task.delete({ where: { id } });
  return true;
};
