import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { colorForAuthor } from './avatarColor';

type CommentDTO = {
  id: string;
  author: string;
  catName: string;
  justification: string;
  created_at: string; 
};

type CreatePayload = Omit<CommentDTO, "id" | "created_at">;


const API_URL:string = 'http://localhost:3000';

const catAPI:AxiosInstance = axios.create({
  baseURL: API_URL,
});

const getComments: () => Promise<CommentDTO[]> = async () => {
  const { data } = await catAPI.get<CommentDTO[]>("/comments");
  return data;
};

const createComment: (p: CreatePayload) => Promise<void> = async (p) => {
  await catAPI.post("/comments", p);
};

const renderComments: (el: HTMLElement, rows: CommentDTO[]) => void = (el, rows) => {
  el.innerHTML = rows.map(c => {
    const initial:string = (c.author ?? '?').trim().charAt(0).toUpperCase() || '?';
    const iso:string = c.created_at;
    const color:string = colorForAuthor(c.author); 

    return `
      <article class="comment">
        <div class="avatar" style="background:${color}">${initial}</div>
        <div class="content">
          <div class="top">
            <h3 class="name">${c.catName}</h3>
            <span class="author">by <strong>${c.author}</strong></span>
            <time class="time" datetime="${iso}">${new Date(iso).toLocaleString()}</time>
          </div>
          <p class="just">${c.justification}</p>
        </div>
      </article>
    `;
  }).join('');
};


// error 
const handleAxiosError: (err: unknown, msg?: string) => void = (err, msg = "Error de red") => {
  const e = err as AxiosError<{ error?: string; mensaje?: string }>;
  let out:string = msg;
  if (e.response) out += ` (${e.response.status}) ${e.response.data?.error ?? e.response.data?.mensaje ?? ""}`;
  else if (e.request) out += " (sin respuesta del servidor)";
  else out += `: ${(e as Error).message}`;
  console.error(out);
  alert(out);
};

const commentsEl = document.getElementById("comments") as HTMLElement;
const form = document.getElementById("form") as HTMLFormElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

const refresh: () => Promise<void> = async () => {
  try {
    const rows:CommentDTO[] = await getComments();
    renderComments(commentsEl, rows);
  } catch (e) {
    handleAxiosError(e, "No pude cargar comentarios");
  }
};


const onSubmit: (ev: SubmitEvent) => Promise<void> = async (ev) => {
  ev.preventDefault();
  submitBtn.disabled = true;

  const author:string = (document.getElementById("author") as HTMLInputElement).value.trim();
  const catName:string = (document.getElementById("catName") as HTMLInputElement).value.trim();
  const justification:string = (document.getElementById("justification") as HTMLTextAreaElement).value.trim();

  if (!author || !catName || !justification) { submitBtn.disabled = false; return; }

  try {
    await createComment({ author, catName, justification });
    form.reset();
    await refresh();
  } catch (e) {
    handleAxiosError(e, "No pude enviar tu propuesta");
  } finally {
    submitBtn.disabled = false;
  }
};

form.addEventListener("submit", onSubmit);
refresh(); 