import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import user from "./models/user";
import course from "./models/course";
import notice from "./models/notice";
import kanbanBoard from "./models/kanbanBoard";

require("dotenv/config");

const app = express();

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

import routes from "./routes/routes";

app.use("/", routes);
// CORS configuration
// To allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:3000', // or '*' for all origins
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "..", "public")));


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando porta: ${process.env.PORT}`);
});
