const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function dbconn() {
    db = await sqlite.open({
        
        filename: "gym.db",
        driver: sqlite3.Database    
    });
    await db.exec("PRAGMA foreign_keys = ON");
    console.log("Connected to database");
    
}


async function getmember({first_name="", last_name="", phone=""}) {
    const first=  `%${first_name}%`;
    const last= `%${last_name}%`;
    const ph= `%${phone}%`;

    return await db.get(
        `SELECT * FROM members 
         WHERE (?= '' OR first_name LIKE ?)
         AND (?= '' OR last_name LIKE ?)
         AND (?= '' OR phone LIKE ?)`,
        first_name, first,
        last_name, last,
        phone, ph
        
    );
    
}

module.exports = {
    
    dbconn,
    getmember

    
}