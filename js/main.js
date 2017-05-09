// ------- START FUNCTIONS -------
$(document).ready(function() {
    getPeopleInSpace();
    getIssLocation();
    window.setInterval(function() {
        getIssLocation();
    }, 3000);
    
});

// ----------- PPL IN SPACE -----------
var NUM_OF_PPL_URL = "http://api.open-notify.org/astros.json";

function getPeopleInSpace() {
    $.ajax({
        url: NUM_OF_PPL_URL,
        method: "GET",
        dataType: "JSONP"   
    }).done(displayPeople);
}

function displayPeople(response) {
    var numOfPeople = response.number;
    $(".num-ppl").text(numOfPeople);
    for (var i = 0; i < numOfPeople; i++) {
        var $newPara = $("<p></p>")
        $newPara.text(response.people[i].name);
        $newPara.appendTo(".people-results");
    }
}

// ------------ ISS -----------
var ISS_URL = "http://api.open-notify.org/iss-now.json";

function getIssLocation() {
    $.ajax({
        url: ISS_URL,
        method: "GET",
        dataType: "JSONP"
    }).done(function(data) {
        displayIssLocation(data);
        return data;
    });
}

function displayIssLocation(response) {
    var longitude = parseFloat(response.iss_position.longitude);
    var latitude = parseFloat(response.iss_position.latitude);
    $(".iss-longitude").text(longitude);
    $(".iss-latitude").text(latitude);
    initMap(latitude, longitude);
}

// ------ GOOGLE MAP TRACKING -------
var map;
var polyMap;
var polyPaths = [];
function initMap(lat, long) {    
    var iss = {lat: lat, lng: long};
    polyPaths.push(iss);
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: iss
    });
    var vmarker = new google.maps.Marker({
        title: "ISS",
        position: iss,
        map: map,
        icon: "assets/ufo-icon.png"
    });

    poly = new google.maps.Map(document.getElementById('map-poly'), {
        zoom: 3,
        center: iss
    });
    var issPath = new google.maps.Polyline({
        map: poly,
        path: polyPaths,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
}
