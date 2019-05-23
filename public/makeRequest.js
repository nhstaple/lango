"strict mode";


function createCORSRequest(method, url)
{
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
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
	if(url.substring(0, 5) == "store") {
		xhr.onload = function()
		{
			let json = JSON.parse(xhr.responseText);
			document.getElementById("translation").textContent += "\r\nSaved!";
		};
	}
	// Else all other requests.
	else {
		xhr.onload = function()
		{
			let json = JSON.parse(xhr.responseText);
			document.getElementById("translation").textContent = json.spanish;
			console.log(json);
		};
	}

	xhr.onerror = function()
	{
		alert('error receiving data from server!');
	};

	xhr.send();
}
