import express from 'express';
import { createMedia, getAllMedia, deleteMedia, updateMedia } from '../controllers/mediaController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, createMedia);
router.get('/', authMiddleware, getAllMedia);
router.delete('/:id', authMiddleware, deleteMedia);
router.put('/:id', authMiddleware, updateMedia);

export default router;
