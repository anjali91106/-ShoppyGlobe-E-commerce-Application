import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/products.routes.js";
import productRoutes from "./Routes/products.routes.js"
import cors from "cors";


const app = express();

mongoose.connect("mongodb://localhost:27017/shoppydb")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error", err));

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection is working fine")
})

db.on("error", () => {
    console.log("Connection is not working fine")
})

const port = 7002;

console.log("hello from server");


//built in middlewares 

app.use(express.json());
app.use("/products", productRoutes);

//handling the cors 
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173/', // your frontend URL
    credentials: true
  }));
  

app.get("/", (req, res) => {
    res.send("API is working!");
  });

app.listen(port, () => {console.log(`server is working fine on port:  ${port}`)});

//connecting to routes 
routes(app);



