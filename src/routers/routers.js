import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import userRouter from "./user.routers.js";
import reminderRouter from "./reminder.routers.js";

const router = Router();
router.use(userMiddleware);

router.use("/login", userRouter);
router.use("/reminders", reminderRouter);

export default router;
