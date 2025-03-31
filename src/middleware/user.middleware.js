export const userMiddleware = (req, res, next) => {
  console.log(req.baseUrl);
  next();
  console.log("este es un middleware");
};
