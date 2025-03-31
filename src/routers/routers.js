import { Router } from "express";
import userRouter from "./user.routers.js";
import reminderRouter from "./reminder.routers.js";

const router = Router();

router.use("/login", userRouter);
router.use("/reminders", reminderRouter);

export default router;
