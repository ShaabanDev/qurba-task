import { Router } from "express";
import withUser from "../../middlewares/with_user";
import restaurantRouter from './restaurant/restaurant'
import userRouter from './user/user'


const router = Router();
router.use('/', withUser)
router.use('/', userRouter)
router.use('/restaurant', restaurantRouter)

export default router;
