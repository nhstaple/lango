#!/usr/bin/env bash
# This installs npm modules required to run the program.
npm install express
npm install request
npm install http
npm install sqlite3
npm install passport
npm install cookie-session
npm install passport-google-oauth20
npm audit fix
# This creates the database.
node dbCreate.js
