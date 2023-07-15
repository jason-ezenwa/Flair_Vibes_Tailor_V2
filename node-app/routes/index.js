import express from 'express';
import recommendationController from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/submit_song', recommendationController.submitSong);

export default router;
