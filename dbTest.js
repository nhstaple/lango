// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

const createCmd = "CREATE TABLE Flashcards (user INT, english TEXT, spanish TEXT, seen INT, correct INT)";

const insertCmd = 'INSERT into Flashcards\
        (user, english, spanish, seen, correct) VALUES (1, \'hello\', \'hola\', 0, 0)';

db.run(createCmd, creationCallback);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function creationCallback(err) {
    if (err) {
        console.log("Table creation error",err);
    } else {
        console.log("Database created or already exists!");
        db.run(insertCmd, insertCallback);
    }
}

function insertCallback(err) {
    if (err) {
        console.log("Card insertion error- ",err);
    } else {
        console.log("Card inserted!");
        dumpDB();
        db.close();
    }
}

function dumpDB() {
    db.all ( 'SELECT * FROM Flashcards', dataCallback);
    function dataCallback( err, data ) {console.log(data)}
}
