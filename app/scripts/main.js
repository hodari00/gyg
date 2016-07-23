$(document).ready(function() {
	getgygjson();
	setInterval('getgygjson()',6000);
});
var map;
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: {lat: 40.731, lng: -73.997}
	});

	$.getJSON( 'MapStyles.json', function( data ) {

	    StylesData = data;

	}).done(function() {

		console.log(StylesData);

	    map.setOptions({

	        styles: StylesData

	    })
	});

}

function getgygjson() {
	$.ajax({
		url: 'https://www.getyourguide.com/touring.json?key=2Gr0p7z96D'
	}).done(function(data) {
		console.log(data);
	 	

	 	var newLat = parseFloat(data.activityCoordinateLatitude);
	 	var newLng = parseFloat(data.activityCoordinateLongitude);
	 	var page = data.activityTitle;
	 	var name = data.customerFirstName;
	 	var image = data.activityPictureUrl; 

	 	$('p.lead').html(data.customerFirstName);

	 	map.panTo(new google.maps.LatLng(newLat, newLng));

	    var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

	 	geocodeLatLng(newLat, newLng, geocoder, map, infowindow, name, page, image);
	});
}

var markers = [];
function geocodeLatLng(newLat, newLng, geocoder, map, infowindow, name, page, image) {
	var latlng = {lat: newLat, lng: newLng};
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
	    	if (results[1]) {

	    		var marker = new google.maps.Marker({
	        		position: latlng,
	        		map: map
	    		});
	    		for (var i = 0; i < markers.length; i++) {
		          markers[i].setMap(null);
		        }
		        markers = [];
		        markers.push(marker);
	    		console.log(markers);
		        markers[markers.length-1].setMap(map);
		        console.log(results[1]);
		        for (I in results[0]['address_components']) {
			        // if (results[0][I]['types'].indexOf('country') > 0) {
			        	if (results[0]['address_components'][I]['types'].indexOf('country') >=0 ) {
			        		console.log(results[0]['address_components'][I]['long_name']);
			        		infowindow.setContent('<strong>' + name + '</strong> from <strong>' 
			        							+ results[0]['address_components'][I]['long_name'] 
			        							+ '</strong><br />' + 'was viewing <br/>' 
			        							+ '<strong>' + page + '</strong>'
			        							+ '<br/><img class="activityImage" src="' + image + '" />');
			        		infowindow.open(map, marker);
			        	}
			            // console.log(results[0]['address_components'][I]['types'].indexOf("country"));
			        // }
			    }
	    	} else {
	      		window.alert('No results found');
	   		}

		} else {
	    	window.alert('Geocoder failed due to: ' + status);
		}
	});
}

var browserSync = require('browser-sync').create();
