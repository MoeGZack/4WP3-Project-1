const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function dbconn() {
    db = await sqlite.open({
        filename: "gym.db",
        driver: sqlite3.Database
    });
    console.log("Connected to database");
}




module.exports = {
    dbconn
}