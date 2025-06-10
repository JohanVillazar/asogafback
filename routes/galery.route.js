import express from 'express';

const router = express.Router();
import { upload } from '../middlewares/upload.js';
import { uploadImage } from '../controllers/gallery.controller.js';


router.post('/upload/:year', upload.single('image'), uploadImage);

export default router;
