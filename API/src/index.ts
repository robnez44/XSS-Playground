import 'dotenv/config'
import app from "./app.ts"
import getConnection from './config/dbConnection';

getConnection();
console.log('servidor iniciado');

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

