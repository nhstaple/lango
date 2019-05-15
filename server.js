const express = require('express')
const port = 55562

function queryHandler(req, res, next)
{
	let url = req.url;
	let qObj = req.query;
	// console.log(qObj);
	if(qObj.word != undefined)
	{
		let str = new String(qObj.word);
		for(let i = str.length - 1; i >= 0; i--)
		{
			str += str[i];
		};
		res.json({ "palindrome": str });
	}
	next();
}

function fileNotFound(req, res)
{
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find ' + url);
	return;
}

const app = express()
app.use(express.static('public'));
app.get('/query', queryHandler);
app.use(fileNotFound);

app.listen(port, function() { console.log('Listening..'); } );
