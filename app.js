import express from "express";
import cors from "cors";
import { initializeDB } from "./database.js";
import carsRouter from "./routes/cars.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cars", carsRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: err})
})

const startServer = () =>{
    initializeDB();
    app.listen(3001, () => console.log("Server is running on port 3001"));
}

startServer();