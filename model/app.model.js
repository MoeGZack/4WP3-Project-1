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


async function getmember(SearchTerm) {

    const member = await db.get(
        `SELECT * FROM members 
         WHERE (first_name like '${SearchTerm}%' or last_name like '${SearchTerm}%' or phone like '${SearchTerm}%')`, 
   
    );
    console.log(member);
    return member;
    
}

module.exports = {
    
    dbconn,
    getmember

    
}