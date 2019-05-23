# This installs npm modules required to run the program.
all:
	npm init
	npm install express
	npm install request
	npm install http
	npm install sqlite3
	npm audit fix
	node dbCreate.js
