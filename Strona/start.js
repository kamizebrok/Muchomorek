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

	var dodaj = [e.latlng.lat, e.latlng.lng]; 

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


// Konfig markera
var redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
  });


// FUZZY SETSY
function process2Points(click_lat, click_lon) {
	
	var tmp_list = [];
	Points2.forEach(point2 => {

		var additional = 0;
		var additional2 = 0;
		
		var latitu = point2[0];
		var longitu = point2[1];	
		var amount_of = point2[2];

		// Ilość 
		if (amount_of >= 0 && amount_of <= 10) {
			additional = 0.1;
		} else if (amount_of > 10 && amount_of <= 40) {
			additional = 0.2;
		} else if (amount_of > 40 && amount_of <= 70) {
			additional = 0.4;
		} else if (amount_of > 70 && amount_of <= 95) {
			additional = 0.7;
		} else if (amount_of > 95) {
			additional = 1.0;
		}
		additional = additional*0.6; // Ewentualne mnożniki jak by Ci się chciało to można tu pokmbinować czy bardziej zależy userowi na ilości czy odległości.

		//Distance
		var distance = Math.sqrt(Math.pow((latitu - click_lat)/2, 2) + Math.pow((longitu - click_lon), 2))/10;
		if (distance >= 0.6) {
			additional2 = 0.1;
		} else if (distance < 0.20 && distance >= 0.12) {
			additional2 = 0.2;
		} else if (distance < 0.12 && distance >= 0.8) {
			additional2 = 0.5;
		} else if (distance < 0.08 && distance >= 0.03) {
			additional2 = 0.7;
		} else if (distance < 0.03) {
			additional2 = 1.0;
		}
		additional2 = additional2*1.3;
		var additional3 = (additional + additional2).toFixed(1); // Im wyższa wartość tym bardziej sie opłaca iść    
		tmp_list.push([click_lat, click_lon, latitu, longitu, additional3]); // latitu i longitu to są najlepsze kordy do których warto iść
		});
	let maxElement = tmp_list.reduce((a, b) => 
	{
		return (a[4] > b[4]) ? a : b;
	});
	console.log(maxElement);
	var lastCircle = L.marker([maxElement[2], maxElement[3]], {icon: redIcon}).addTo(map);
	mapMarkers.push(lastCircle);
}
