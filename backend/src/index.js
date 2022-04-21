const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "..", "public")));

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

require("./models/user");
require("./models/course");
require("./models/notice");
require("./models/kanbanBoard");

const routes = require("./routes/routes");

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando porta: ${process.env.PORT}`);
});
