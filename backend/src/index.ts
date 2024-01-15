import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config";

const app = express();

mongoose.connect("process.env.ATLAS_URI", {
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

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,           
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
	//res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");

	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  	//res.header("Access-Control-Allow-Headers", "");

  	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

  	//app.use(cors(corsOptions));

  	next();
});

app.use("/", routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando porta: ${process.env.PORT}`);
});
