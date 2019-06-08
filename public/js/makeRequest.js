"strict mode";


function createCORSRequest(method, url)
{
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
}

function defaultRequest()
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("translation").textContent = json.spanish;
	console.log(json);
}

function saveFlashcard()
{
	if(document.getElementById("cardInput").value.length > 0) {
		document.getElementById("translation").textContent += " Saved!";
	}
}

function gotUserName()
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("footer").textContent = json.firstName + " " + json.lastName; 
}

function updateCard()
{
	let json = JSON.parse(xhr.responseText);
	document.getElementById("trans") = json.spanish;
}

function makeCorsRequest(data)
{
	let url = data;
	let xhr = createCORSRequest('GET', url);

	if(!xhr)
	{
		alert('CORS not supported');
		return;
	}

	// If there was a store request.
	if(url.substring(0, length("store")) == "store") {
		xhr.onload = function()
		{
			saveFlashcard();
		};
	}
	else if(url.substring(0, length("name")) == "name")
	{
		xhr.onload = function()
		{
			gotUserName();
		}
	}
	// Else there was a request for a card.
	else if(url.substring(0, length("card"))  == "card")
	{
		xhr.onload = function()
		{
			updateCard();
		};
	}
	// Else all other requests.
	else {
		xhr.onload = function()
		{
			defaultRequest();
		};
	}

	xhr.onerror = function()
	{
		alert('error receiving data from server!');
	};

	xhr.send();
}
