import type { Request, Response } from "express";
import Comment from "../model/comment";
import { CreateCommentBody } from "../interfaces/CreateCommentBody";
import { ObjectId } from "mongoose";
import { HydratedDocument } from "mongoose";
import { IComment } from "../interfaces/IComment";

export async function createComment(
  req: Request<unknown, unknown, CreateCommentBody>,
  res: Response
): Promise<void> {
  try {
    const { author, catName, justification } = req.body || {};
    
    if (!author || !catName || !justification) {
      res
        .status(400)
        .json({ error: "author, catName y justification son requeridos" });
      return;
    }

    const doc: HydratedDocument<IComment> = await Comment.create({
        author: String(author).trim(),
        catName: String(catName).trim(),
        justification: String(justification).trim()
    });

    const id = doc._id.toString();

    res.status(201).set("Location", `/comments/${id}`).json({
    id,
    author: doc.author,
    catName: doc.catName,
    justification: doc.justification,
    created_at: (doc as any).created_at
  });

  } catch (error) {
    res.status(500).json({error: 'error al crear el comentario'})
  }
}

export async function getComments(req: Request, res: Response): Promise<void> {
  try {
    const rows = await Comment.find({}).sort({ created_at: -1 }).lean();

    const data = rows.map((r) => ({
      id: r._id.toString(),
      author: r.author,
      catName: r.catName,
      justification: r.justification,
      created_at: r.created_at,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los comentarios" });
  }
}
