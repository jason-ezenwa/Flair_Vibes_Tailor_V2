import express from 'express';
import recommendationController from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/get_recommendations', recommendationController.getRecommendations);
router.get('/hello', recommendationController.testHello);

export default router;
