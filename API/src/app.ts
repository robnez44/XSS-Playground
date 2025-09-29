import express from 'express';
import cors from 'cors';
import commentRoutes from './routes/comment.router'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json());
app.use(commentRoutes);

export default app;