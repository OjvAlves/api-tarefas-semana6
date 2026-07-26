import { Router } from 'express';
import * as TaskController from '../controllers/TaskController';

const router = Router();

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;