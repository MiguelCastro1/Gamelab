const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", (_) => {
  console.log("Conectado ao banco de dados GameLab");
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ Erro na conexão ao banco de dados: ${err.message}`);
});

require("./app/models/user");
require("./app/models/course");

const routes = require("./app/routes/routes");

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando porta: ${process.env.PORT}`);
});
