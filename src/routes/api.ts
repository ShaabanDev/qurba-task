import { Router } from "express";

import errorHandlerMiddleware from "../middlewares/api_error_handler";

import userRouter from './user/user_apis'
import adminRouter from './admin/admin_apis'
const router = Router();


// App Routes
router.use('/admin', adminRouter)
router.use('/user', userRouter)

// Errors handlers
router.use(errorHandlerMiddleware);

export default router;
