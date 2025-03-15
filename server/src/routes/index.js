import {Router} from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import programRoutes from './programs.js';
import courseRoutes from './courses.js';
import enrollRoutes from './enrollments.js';

const rootRouter = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/programs', programRoutes);
rootRouter.use('/courses', courseRoutes);
rootRouter.use('/enrollments', enrollRoutes);

export default rootRouter;