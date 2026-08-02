import express from 'express';
import taskRoutes from './routes/TaskRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});