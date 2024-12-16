import sqlite3, { Database } from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await db.run("CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, model TEXT, color TEXT, year INTEGER)");
}

function dbQuery(sql, params = []){
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        }
    )});
}

function dbRun(sql, params = []){
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err){
            if(err) reject(err);
            resolve(this);
        }
    )})
}

export {db, initializeDB, dbQuery, dbRun};