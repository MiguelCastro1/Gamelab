import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const Auth = (req: Request, res: Response, next:NextFunction ) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).send("Acesso negado, Verifique Token");
  }

  let token = req.headers.authorization.split(" ")[1];

  if (token) {
    //console.log(token)
    jwt.verify(token, process.env.SECRET_KEY ?? 'SECRET', (err:any) => {
      if (err) {
        return res.status(401).send("Acesso negado!");
      }
     // req.userId = jwt.decode._id;
      next();
    });
  } else {
    return res.status(401).send("Acesso negado!");
  }
};

export { Auth }

