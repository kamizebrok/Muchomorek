//Import z .json do var Points

var Points = [];
fetch('./Coords.json')
    .then(results => results.json())
    .then(data =>{
        Points = data;
		processPoints(Points);	
    });

	function processPoints(Points) {
		console.log(Points);
		Points.forEach(point => {
			var intensity = point.amount;
			var radius = 15 * intensity;
			var color = 'red';
			var circle = L.circle([point.latitude, point.longitude], {
				color: color,
				fillColor: color,
				fillOpacity: 0.8,
				radius: radius
			}).addTo(map);
			circle.bindTooltip(`Latitude: ${point.latitude}, Longitude: ${point.longitude}, Intensity/hour: ${intensity.amount}, Type: ${point.type}, Region: ${point.voidvodeship}`).openTooltip();
		});
	}



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

	
	//e.latlng to kordy klikającego na mapie ( widać w konsoli )
	console.log(e.latlng)
	//Funkcja pogodowa wywołanie od punktu, wszystko w konsoli
	console.log(getWeatherData(e.latlng.lat, e.latlng.lng, apiKey));
}
map.on('click', onMapClick);


 
 
