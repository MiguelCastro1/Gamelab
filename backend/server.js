import express from "express"
import cors from "cors"
import courses from "./api/courses.route.js"

const app = express()

app.use(cors())
app.use(express.json())
 
app.use("/api/v1/courses", courses)
app.use("*", (req, res) => res.status(404).json({error: "not found!"}))

export default app

// const express = require('express')
// const cors = require('cors')
// const app = express()
// require('doenv')


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   client.close();
// });

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(port, ()=>{
//   console.log('Server is on port: ${port}')
// })