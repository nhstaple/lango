// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

const userDb = new sqlite3.Database("Users.db");

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

const createCmd = "CREATE TABLE Flashcards (user INT, english TEXT, spanish TEXT, seen INT, correct INT)";

const userCmd = "CREATE TABLE Users (FirstName TEXT, LastName TEXT, GoogleID INT NOT NULL, PRIMARY KEY (GoogleID))";

const insertCmd2 = "INSERT into Users (FirstName, LastName, GoogleID) VALUES ('John', 'Cena', 0123456789)";

const insertCmd1 = 'INSERT into Flashcards\
        (user, english, spanish, seen, correct) VALUES (1, \'hello\', \'hola\', 0, 0)';

db.run(createCmd, creation1);
userDb.run(userCmd, creation2);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function creation1(err) {
    if (err) {
        console.log("Database creation error",err);
    } else {
        console.log("Database created");
        db.run(insertCmd1, insert1);
    }
}

function creation2(err) {
	if(err) {
		console.log("Database creation error", err);
	} else {
		console.log("Database created");
		userDb.run(insertCmd2, insert2);
	}
}

function insert1(err) {
    if (err) {
        console.log("Card insertion error- ",err);
    } else {
        console.log("Card inserted!");
        db.all("SELECT * FROM Flashcards", function(err, data) { console.log(data); });
        db.close();
    }
}

function insert2(err) {
	if(err) {
		console.log("Insert err", err);
	} else {
		console.log("User inserted");
		userDb.all("SELECT * FROM Users", function(err, data) { console.log(data); });
		userDb.close();
	}
}
