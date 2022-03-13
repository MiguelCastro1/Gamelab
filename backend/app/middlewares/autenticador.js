const jwt = require("jsonwebtoken");

auth = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).send("Acesso negado, Verifique Token");
  }
  let token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
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

module.exports;
