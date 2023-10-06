import { Router } from 'express';

import AuthRoutes from '../../interfaces/routes/v1/auth';
import UsersRoutes from '../../interfaces/routes/v1/users';
import BlogRoutes from '../../interfaces/routes/v1/blog';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/post', BlogRoutes);
router.use('/users', UsersRoutes);

export default router;
