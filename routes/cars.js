import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try{
        const autok = await dbQuery("SELECT * FROM cars");
        res.status(200).json(autok);
    }catch(err){
        next(err);
    }
    
});

router.get("/:id", async (req, res, next) => {
    try{
        const [auto] = await dbQuery("SELECT * FROM cars WHERE id = ?;", [req.params.id]);
        if(!auto) res.status(404).json({message: "Car not found"});
        else res.status(200).json(auto);
    }
    catch(err){
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try{
        const result = await dbRun("INSERT INTO cars (brand, model, color, year) VALUES (?, ?, ?, ?);", [req.body.brand, req.body.model, req.body.color, req.body.year]);
        res.status(201).json({ id: result.lastID, ...req.body});
    } catch(err){
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
    try{
        const [auto] = await dbQuery("SELECT * FROM cars WHERE id = ?;", [req.params.id]); 
        if(!auto) return res.status(404).json({ message: "Car not found"})
        
        await dbRun("UPDATE cars SET brand = ?, model = ?, color = ?, year = ? WHERE id = ?;",
            [req.body.brand || auto.brand, req.body.model || auto.model, req.body.color || auto.color, req.body.year || auto.year, req.params.id]
        );
        res.status(200).json({ id: req.params.id, brand: req.body.brand || auto.brand, model: req.body.model || auto.model, color: req.body.color || auto.color, year: req.body.year || auto.year})
    }
    catch(err){
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    const [auto] = await dbQuery("SELECT * FROM cars WHERE id = ?;", [req.params.id]); 
    if(!auto) return res.status(404).json({ message: "Car not found"});

    await dbRun("DELETE FROM cars WHERE id = ?;", [req.params.id]);
    res.status(204);
})



export default router;