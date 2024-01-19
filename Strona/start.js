//Import z .json do var Points

var Points = [];
var Points2 = [];
fetch('./Coords.json')
    .then(results => results.json())
    .then(data =>{
        Points = data;
		processPoints(Points);			
    });

function processPoints(Points) {
	// console.log(Points);
	
	Points.forEach(point => {
		//Dodawanie do Points2
		Points2.push(point);

		var intensity = point.amount;
		var radius = 30 * intensity;
		var color = 'red';
		var circle = L.circle([point.latitude, point.longitude], {
			color: color,
			fillColor: color,
			fillOpacity: 0.8,
			radius: radius
		}).addTo(map);
		circle.bindTooltip(`Longitude: ${point.longitude}, Latitude: ${point.latitude}, Intensity/hour: ${intensity.amount}, Type: ${point.type}, Region: ${point.voidvodeship}`).openTooltip();
	});
}

console.log(Points);

//Tworzenie mapy
var map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 15,
		minZoom: 7,
		attribution: '© OpenStreetMap'
}).addTo(map);

var start = L.latLng(52.229676, 23.012229);
var end = L.latLng(52.406374, 16.925168);
var bounds = L.latLngBounds(start, end);
map.fitBounds(bounds);




//Czerwone kropki
Points.forEach(function(point) {
var intensity = point.amount;
var radius = 5;
var color = 'red';

var circle = L.circle([point.latitude, point.longitude[1]], {
		color: color,
		fillColor: color,
		fillOpacity: 0.8,
		radius: radius
}).addTo(map);

circle.bindTooltip(`Latitude: ${point.latitude}, Longitude: ${point.longitude}, Intensity/hour: ${intensity.amount}, Type: ${point.type}, Region: ${point.voidvodeship}`).openTooltip();
});


// FUNKCJA POGODOWA
const apiKey = "39c43c6a1704445300c2c716f37cb354";
function getWeatherData(lat, lon, apiKey) {
	const baseUrl = `http://api.openweathermap.org/data/2.5/weather?`;
	let params = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
 
	fetch(baseUrl + params)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
}

//Klikanie na mapie
var popup = L.popup();
var activeMarker = null;
function onMapClick(e) {

    if (activeMarker) {
        map.removeLayer(activeMarker);
    }

    let marker = L.marker(e.latlng).addTo(map); 
	activeMarker = marker;

	
	//Funkcja pogodowa wywołanie od punktu, wszystko w konsoli

	var weather_stats = getWeatherData(e.latlng.lat, e.latlng.lng, apiKey);

	
	//Wywala error, że undefined !!!!! 
	console.log('Weather data:', (weather_stats));


	if (weather_stats != undefined) {
		var parsedStats = JSON.parse(weather_stats);
		var temperature = parsedStats.temp;
		var coords = parsedStats.coord;
		var conditions = parsedStats.weather;
		console.log(weather_stats);
		document.getElementById("pogoda").innerHTML = `Temperature: ${temperature}, Coords: ${coords}, Weather: ${conditions}`;
	
	} else 
	{
		console.log('Weather data is undefined');
	}
}
map.on('click', onMapClick);


// FUZZY SETSY

function process2Points(Points2, click_lat, click_lon) {
	console.log(Array.isArray(Points2));
	console.log(Points2.length);
	Points2.forEach(point => {
		
		//Amount
		var additional = 0;
		var amount_of = point.amount;

		if (amount_of >= 0 && amount_of <= 5) {
			additional = 0.1;
		} else if (amount_of > 5 && amount_of <= 20) {
			additional = 0.2;
		} else if (amount_of > 20 && amount_of <= 50) {
			additional = 0.5;
		} else if (amount_of > 50 && amount_of <= 100) {
			additional = 0.7;
		} else if (amount_of > 100) {
			additional = 1.0;
		}
		//Distance
		var latitu = point.latitude;
		var longitu = point.longitude;

		var c_lat = click_lat;
		var c_lon = click_lon;
		var distance = Math.sqrt(Math.pow(latitu - click_lat, 2) + Math.pow(longitu - click_lon, 2));
		console.log(additional, distance, typeof(point.latitude), typeof(c_lat));

		});
}

var click_lat = 49.8428;
var click_lon = 16.8197;
process2Points(Points2, click_lat, click_lon);

 
 