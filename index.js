import express from "express";
import cors from "cors";
import router from "./src/routers/routers.js";

export const users = [
  {
    name: "admin",
    username: "admin",
    password: "admin123",
    token: "abc123",
  },
];

const PORT = 3000;
const server = express();
server.use(express.json());
server.use(cors({ origin: "*" }));

server.use("/api", router);

server.get("/", (req, res) => {
  res.json({ message: "Rutas: /api/login" });
});

server.listen(PORT, (error) => {
  error
    ? console.error(`Error: ${error}`)
    : console.log("App Listening in " + PORT);
});
