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

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Formato incorrecto de petición" });
    }

    let isPsw = users.find((user) => user.username === username);

    if (!isPsw) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas. User Not Found" });
    }

    const [salt, hash] = isPsw.password.split(":");
    const derivedKey = await crypto.scryptSync(password, salt, 64);
    if (derivedKey.toString("hex") !== hash) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas. Password incorrecto" });
    }

    let token = randomBytes(48).toString("hex");

    return res.json({
      name: isPsw.name,
      username: isPsw.username,
      token: token,
    });
  } catch (err) {
    return res.status(403).json({ message: "ERROR " + err });
  }
});

export default userRouter;
