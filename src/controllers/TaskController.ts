import { Request, Response } from 'express';
import * as TaskService from '../services/TaskService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'O título é obrigatório.' });
    
    const newTask = TaskService.createTask(title);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { completed } = req.query;
    const tasks = TaskService.getTasks(completed as string);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = TaskService.getTaskById(id);
    
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar tarefa.' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const updatedTask = TaskService.updateTask(id, title, completed);
    
    if (!updatedTask) return res.status(404).json({ error: 'Tarefa não encontrada para atualização.' });
    
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = TaskService.deleteTask(id);
    
    if (!deleted) return res.status(404).json({ error: 'Tarefa não encontrada para exclusão.' });
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
};