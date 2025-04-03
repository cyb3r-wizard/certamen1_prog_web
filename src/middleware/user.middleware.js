import { users } from "../../index.js";

export const userMiddleware = (req, res, next) => {
  const no = `<h1> Permiso Denegado >:( </h1>`;

  const tokenAuthorization = req.get("X-Authorization");
  const usuario = users.find((usuario) => usuario.token === tokenAuthorization);

  if (!tokenAuthorization) {
    return res.status(401).send(no);
  }

  if (!usuario) {
    return res.status(401).send(no);
  }

  if (tokenAuthorization !== usuario.token) {
    return res.status(401).send(no);
  }

  next();
};
