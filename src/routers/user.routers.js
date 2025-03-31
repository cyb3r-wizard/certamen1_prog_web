import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "ESTE SERÁ EL LOGIN" });
});

userRouter.post("/", (req, res) => {
  res.json({ message: "Sesión Iniciada" });
});

export default userRouter;
