import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import afiliacionRouter from './routes/afiliacion.route.js';
import galeyRouter from './routes/galery.route.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/afiliacion', afiliacionRouter);
app.use('/galery', galeyRouter);






export default app;
