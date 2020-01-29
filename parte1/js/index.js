
console.log("SI JALA");

function watchForm2(valor){

	let url = "https://restcountries.eu/rest/v2/name/" + valor;

	$.ajax({

		url : url,
		method : "GET",
		dataType : "json",
		success : function (responseJSON){
			displayResult(responseJSON);
		},
		error : function(err){
			console.log(err);

			let results = $('#results');

			let fir = document.createElement("p");

			let mal = "WRONG NAME ";

			fir.append(mal);

			results.append(fir);


		}
	});

}

function displayResult(responseJSON){

	console.log("SI LLEGA AQUI");

	let results = $('#results');

	let fir = document.createElement("li");

	let nombre = responseJSON[0].name;

	fir.append(nombre);


	let sec = document.createElement("li");

	let capital = responseJSON[0].capital;

	sec.append(capital);


	let tir = document.createElement("li");

	let poblacion = responseJSON[0].population;

	tir.append(poblacion);


	let fou = document.createElement("li");

	let region = responseJSON[0].region;

	fou.append(region);


	let fiv = document.createElement("li");

	let zonasH = responseJSON[0].timezones;

	fiv.append(zonasH);


	let six = document.createElement("li");

	let colinda = responseJSON[0].borders;

	six.append(colinda);

	

	let img = document.createElement("img");

	img = "<img src = '" + responseJSON[0].flag + "'/>"

	results.append(fir);
	results.append(sec);
	results.append(tir);
	results.append(fou);
	results.append(fiv);
	results.append(six);
	results.append(img);

	console.log(responseJSON);
}


function watchForm(){

	let valor = $('#query').val();
	watchForm2(valor);
}

function init(){

	$('#submit').click(function(e){

		e.preventDefault();
		watchForm();

	});
}

init();
