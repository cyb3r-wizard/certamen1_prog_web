import { Router } from "express";
import crypto, { randomBytes } from "node:crypto";
import database from "../../database.json" assert { type: "json" };
const userRouter = Router();
const users = database.users;

let salt16 = randomBytes(16).toString("hex");

userRouter.get("/", (req, res) => {
  users.map((user) => {
    user.token = salt16.toString("hex");
  });
  res.json({ message: "ESTE SERÁ EL LOGIN " + salt16.toString("hex") });
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    let isPsw = users.find((user) => user.username === username);
    const [salt, hash] = isPsw.password.split(":");
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return res.send(error);
      if (derivedKey.toString("hex") != hash) {
        res.status(403).json({ message: "Credenciales inválidas" });
      }
    });

    if (!isPsw) {
      res.status(403).json({ message: "Credenciales inválidas" });
    }

    res.json({
      message: `NAME ${isPsw.name}, USERNAME: ${isPsw.username}`,
    });
  } catch (err) {
    res.status(403).json({ message: "" + err });
  }
});

export default userRouter;
