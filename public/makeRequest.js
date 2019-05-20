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

	xhr.onload = function()
	{
		let json = JSON.parse(xhr.responseText);
		document.getElementById("translation").textContent = json.spanish;
		console.log(json);
		storeReq();
	};

	xhr.onerror = function()
	{
		alert('error receiving data from server!');
	};

	xhr.send();
}

function storeReq()
{
	let str = "store?english=" + document.getElementById("cardInput").value
			+ "&spanish=" + document.getElementById("translation").textContent;
	makeCorsRequest(str);
	return;
}

function submitReq()
{
	let str = "translate?english=" + document.getElementById("cardInput").value;
	makeCorsRequest(str);
	return;
}
