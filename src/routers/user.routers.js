import { Router } from "express";
import crypto, { randomBytes } from "node:crypto";
import database from "../../database.json" assert { type: "json" };
const userRouter = Router();
const users = database.users;

let salt16 = randomBytes(16).toString("hex");

async function hashPsw(password) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt16, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt16}:${derivedKey.toString("hex")}`);
    });
  });
}

userRouter.get("/", (req, res) => {
  users.map((user) => {
    user.token = salt16.toString("hex");
  });
  res.json({ message: "ESTE SERÁ EL LOGIN " + salt16.toString("hex") });
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hidden = await hashPsw(password);

    let isPsw = users.find(
      (user) => /*user.password === password && */ user.username === username
    );
    if (!isPsw) {
      res.status(403).json({ message: "Credenciales inválidas" });
    }
    isPsw.password = hidden;
    console.log(isPsw);
    console.log(users);
    res.json({
      message: `NAME ${isPsw.name}, USERNAME: ${isPsw.username}`,
    });
  } catch (err) {
    res.status(403).json({ message: "" + err });
  }
});

export default userRouter;
