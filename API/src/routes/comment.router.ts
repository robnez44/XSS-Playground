import { Router } from "express";
import { createComment, getComments } from "../controllers/commentController";

const router = Router();

router.post('/comments', createComment);
router.get('/comments', getComments);

export default router;
