import { Router } from 'express';
// import AuthenticationController from '../../controllers/AuthenticationController';
import BlogController from '../../controllers/BlogController';
import AuthenticationMiddleware from '../../middlewares/AuthenticationMiddleware';

const router = Router();

router.get('/get-post/:id',BlogController.getPost );
router.get('/get-posts',BlogController.findPosts );
router.post('/add-post', AuthenticationMiddleware(),BlogController.createPost);
router.delete('/delete-post/:id',  AuthenticationMiddleware(),BlogController.deletePost);
router.patch('/update-post/:id',  AuthenticationMiddleware(),BlogController.updatePost);

export default router;
