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

const init = `
<h1>CERT 1</h1>
<ul>
  <li>
    <a href="https://49s7y6-3000.csb.app/api/login">LOGIN</a>
  </li>
  <li>
    <a href="https://49s7y6-3000.csb.app/api/auth/reminders">RECORDATORIOS</a>
  </li>
</ul>`;

const PORT = 3000;
const server = express();
server.use(express.json());
server.use(cors({ origin: "*" }));

server.use("/api", router);

server.get("/", (req, res) => {
  res.send(init);
});

server.listen(PORT, (error) => {
  error
    ? console.error(`Error: ${error}`)
    : console.log("App Listening in " + PORT);
});
