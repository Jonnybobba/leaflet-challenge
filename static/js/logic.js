d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    
    // Create a map object
    var myMap = L.map("map", {
        center: [0, 0],
        zoom: 1.5
    });
    
    // Define map layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    

    // Read in Data
    var earthquakes = data.features
    
    var maxDepth = 0
    for (i=0; i<earthquakes.length; i++) {
        var tDepth = earthquakes[i].geometry.coordinates[2]
        if (tDepth > maxDepth) {
            maxDepth = tDepth
        }
    }
    
    console.log(earthquakes[0])
    console.log(maxDepth)
    
    for (i=0; i<earthquakes.length; i++) {
        var geometry = earthquakes[i].geometry
        var properties = earthquakes[i].properties
        var lat = geometry.coordinates[1]
        var lon = geometry.coordinates[0]
        var depth = geometry.coordinates[2]
        var mag = properties.mag
        var location = [lat, lon]

        L.circle(location, {
            fillOpacity: depth/maxDepth + .75,
            color: "brown",
            fillColor: "brown",
            radius: mag*50000
        }).bindPopup("<h1><a href='" + properties.url + "'>" + properties.place + "</a></h1> <hr> <h2>Magnitude: " + properties.mag + "</h2> <hr> <h2>").addTo(myMap)
    } 
})

