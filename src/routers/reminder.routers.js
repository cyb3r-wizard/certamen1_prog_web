import { Router } from "express";
const reminderRouter = Router();

reminderRouter.get("/", (req, res) => {
  res.json({ message: "AQUI SE MOSTRARÁN LAS TAREAS" });
});

reminderRouter.post("/", (req, res) => {
  res.json({ message: "XAO PESCAO" });
});

reminderRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has ingresado el id: ${id} ` });
});

reminderRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has borrado el id ${id}` });
});

export default reminderRouter;
