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
}
map.on('click', onMapClick);


//Openweathermap ( nie robić tego tak, tylko przez api)
// var Weather = [];
// fetch('./pogoda.json')
//     .then(results => results.json())
//     .then(data =>{
//         Weather = data;
// 		processPoints(Weather);	
//     });


// import "./App.css";
// import { useState } from "react";


// const api = {
// 	key: "39c43c6a1704445300c2c716f37cb354"
// 	base: "https://api.openweathermap.org/data/2.5/"
// };

// https://api.openweathermap.org/data/1.5/weather?lat={52.649729197309426}&lon={19.368896484375004}&appid={39c43c6a1704445300c2c716f37cb354}
// https://pro.openweathermap.org/data/2.5/forecast/climate?lat={52.649729197309426}&lon={19.368896484375004}&appid={39c43c6a1704445300c2c716f37cb354}