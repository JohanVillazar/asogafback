import express from 'express';
import { registrarAfiliacion,confirmarPago } from '../controllers/afiliacion.controller.js';
import  {protect}  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, registrarAfiliacion);
router.patch('/:id/pago', protect, confirmarPago);

export default router;
