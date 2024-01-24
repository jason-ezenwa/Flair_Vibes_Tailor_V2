import express from 'express';
import recommendationController from '../controllers/recommendationController.js';
import homeController from '../controllers/homeController.js';

const router = express.Router();

router.post('/get_recommendations', recommendationController.getRecommendations);
router.get('/hottest_songs', recommendationController.getHottestSongs);
router.get('/', homeController.home);

export default router;
