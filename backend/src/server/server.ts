import express from "express";
import cors from "cors";
import path from "path";
import connect from "./connect";
import "dotenv/config";

const app = express();

import routes from "../routes/index.routes";

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  	next();
});

const db:string = process.env.ATLAS_URI ?? 'ATLAS_URI=mongodb+srv://devUser:SRtxHkJTCKhTuDQV@cluster0.b40fs.mongodb.net/GamelabDB?retryWrites=true&w=majority'
connect({db});

app.use("/", routes);

export { app }