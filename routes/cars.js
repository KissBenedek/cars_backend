import express from "express";
import { db, dbQuery, dbRun } from "../database";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try{
        const autok = dbQuery("SELECT * FROM cars");
        res.status(200).json(autok);
    }catch(err){
        next(err);
    }
    
})

export default router;