import express from 'express';
import commentRoutes from './routes/comment.router'

const app = express();

app.use(express.json());
app.use(commentRoutes);

export default app;