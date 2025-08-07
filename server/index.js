import express from 'express';
import cors from 'cors';
import { buscarControlesPorTexto } from './userRepository.js';
import { getConnection } from './db.js';

getConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/controles', async (req, res) => {
  const { texto } = req.query;
  if (!texto) return res.status(400).json({ error: 'Falta el parámetro "texto"' });

  const resultados = await buscarControlesPorTexto(texto);
  res.json(resultados);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
