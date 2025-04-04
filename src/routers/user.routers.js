import { Router } from "express";
import scrypt, { randomBytes } from "node:crypto";
import database from "../../database.json" assert { type: "json" };
const userRouter = Router();
const users = database.users;

let salt16 = randomBytes(16);

userRouter.get("/", (req, res) => {
  users.map((user) => {
    user.token = salt16.toString("hex");
  });
  res.json({ message: "ESTE SERÁ EL LOGIN " + salt16.toString("hex") });
});

userRouter.post("/", (req, res) => {
  try {
    const { username, password } = req.body;
    //hashear password antes de consultar.
    let isPsw = users.find(
      (user) => user.password === password && user.username === username
    );
    if (!isPsw) {
      res.status(403).json({ message: "Credenciales inválidas" });
    }
    console.log(isPsw);
    res.json({
      message: "Sesión iniciada, " + isPsw.username + salt16.toString("hex"),
    });
  } catch (err) {
    res.status(403).json({ message: "" + err });
  }
});

export default userRouter;
