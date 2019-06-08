"strict mode";


function createCORSRequest(method, url)
{
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
}

function defaultRequest(xhr)
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("translation").textContent = json.spanish;
	console.log(json);
}

function saveFlashcard(xhr)
{
	if(document.getElementById("cardInput").value.length > 0) {
		document.getElementById("translation").textContent += " Saved!";
	}
}

function gotUserName(xhr)
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("footer").textContent = json.firstName + " " + json.lastName; 
}

function updateCard(xhr)
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("trans") = json.spanish;
}

function makeCorsRequest(data)
{
	let url = data;
	let xhr = createCORSRequest('GET', url);
	const store = "store";
	const name = "name";
	const card = "card";

	if(!xhr)
	{
		alert('CORS not supported');
		return;
	}

	// If there was a store request.
	if(url.substring(0, store.length) == "store") {
		xhr.onload = function()
		{
			saveFlashcard(xhr);
		};
	}
	else if(url.substring(0, name.length) == "name")
	{
		xhr.onload = function()
		{
			gotUserName(xhr);
		}
	}
	// Else there was a request for a card.
	else if(url.substring(0, card.length)  == "card")
	{
		xhr.onload = function()
		{
			updateCard(xhr);
		};
	}
	// Else all other requests.
	else {
		xhr.onload = function()
		{
			defaultRequest(xhr);
		};
	}

	xhr.onerror = function()
	{
		alert('error receiving data from server!');
	};

	xhr.send();
}
