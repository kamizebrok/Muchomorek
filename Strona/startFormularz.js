//Import z .json do var Points

var Points = [];
var Points2 = [];

var click_lat = 49.8428;
var click_lon = 16.8197;

fetch('./Coords.json')
    .then(results => results.json())
    .then(data =>{
        Points = data;
		processPoints(Points);	
		// process2Points(Points);			
    });

function processPoints(Points) {
	Points.forEach(point => {
		Points2.push([point.latitude, point.longitude, point.amount]); //KROK 1
		var intensity = point.amount;
		var radius = 30 * intensity;
		if (intensity <= 30) {
			color = 'red'; 
		} else if (intensity <= 60) {
			color = 'darkred'; 
		} else if (intensity <= 95) {
			color = 'firebrick'; 
		} else {
			color = 'maroon'; 
		}
		// var color = 'red';
		var circle = L.circle([point.latitude, point.longitude], {
			color: color,
			fillColor: color,
			fillOpacity: 0.8,
			radius: radius
		}).addTo(map);
		// console.log(typeof point.latitude);
		circle.bindTooltip(`Longitude: ${point.latitude}, Latitude: ${point.longitude}, Intensity/hour: ${point.amount}, Type: ${point.type}, Region: ${point.voidvodeship}`).openTooltip();
	});
}

// console.log(Points2);

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



//Klikanie na mapie
var popup = L.popup();
var activeMarker = null;
var mapMarkers = [];
var lastCircle;

function onMapClick(e) { 
	for (var i = 0; i < mapMarkers.length; i++) {
		map.removeLayer(mapMarkers[i]);
	}
    if (activeMarker) {
        map.removeLayer(activeMarker);
    }
    let marker = L.marker(e.latlng).addTo(map); 

	var dodaj = [e.latlng.lat, e.latlng.lng];   // To do bazy danych, wtedy każde kliknięcie przekazuje tablice kordów: dodaj = [latitude, longitude]
	//to powyzej ma isc do bazy danych!

	//wyswietlenie w 'oklicy.html'
	var latitudeString = dodaj[0].toFixed(7).toString();
	var longitudeString = dodaj[1].toFixed(7).toString();
	var miejsceLabel = document.getElementById("miejscegrzibuw");
	miejsceLabel.textContent = "Szerokość Geograficzna: " + latitudeString;
	var miejsceLabel2 = document.getElementById("miejscegrzibuw2");
	miejsceLabel2.textContent = "Wysokość Geograficzna: " + longitudeString;

	activeMarker = marker;
	process2Points(e.latlng.lat, e.latlng.lng)
	
}
map.on('click', onMapClick, Points2);

