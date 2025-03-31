import express from "express";
import cors from "cors";

import router from "./src/routers/routers.js";

const PORT = 3000;
const server = express();
server.use(express.json());
server.use(cors({ origin: "*" }));

server.use("/api", router);

server.get("/", (req, res) => {
  res.json({ message: "Rutas: /login" });
});

server.listen(PORT, () => {
  console.log("App Listening in " + PORT);
});
