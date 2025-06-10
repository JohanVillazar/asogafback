import app from './app.js';
import { connectDB } from './models/index.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
