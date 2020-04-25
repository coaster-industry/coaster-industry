// load map
mapboxgl.accessToken = 'pk.eyJ1IjoibGlvanVuMjIiLCJhIjoiY2s5Nzg2eXF5MGx5bTNncGNmNDZhZmE4dyJ9.sVCRIljCrOv1r3ihRxeANQ';
var map = new mapboxgl.Map({
    container : 'map',
    style : 'mapbox://styles/mapbox/streets-v11',
    center : [12.6425595, 46.9732064],
    zoom : 4
})

/*
    Defining layers by marker type. Each JSON defined layers must be added
    to the layers list below which contains the layer that will be displayed.
*/
var constructorLayer = 
{
    'id' : 'constructors',
    'name' : 'Constructors',
    'class' : 'constructors-div',
    'color' : '#0f62fe',
    'data' : constructors_geojson,
};
var parkLayer = 
{
    'id' : 'parks',
    'name' : 'Theme Parks',
    'class' : 'parks-div',
    'color' : '#da1e28',
    'data' : parks_geojson
};
var assemblerLayer = 
{
    'id' : 'assemblers',
    'name' : 'Attraction Assemblers',
    'class' : 'assemblers-div',
    'color' : '#24a148',
    'data' : assemblers_geojson
};
var layers = [constructorLayer, parkLayer, assemblerLayer]


// Filter menu 
var filterGroup = document.getElementById('filter-group');


// Init the map elements when loading the map
map.on('load', function() {
    
    // Initializing each layer described above
    layers.forEach(function(layer) {

        // Creating the markers of this layer
        layer.data.features.forEach(function(marker) {
            
            // Creating a popup that will be attached to the marker
            var popup = new mapboxgl.Popup({
                closeButton : true,
                anchor : 'bottom-left',
                maxWidth : '340px' // default is 240px
            })
                .setLngLat(marker.geometry.coordinates)
                .setHTML(
                    "<h3>" + marker.name + "</h3>" +
                    "<p>" + marker.brief + "</p>" +
                    "<a href=" + marker.uri + ">more... </a>"
                )
                .addTo(map);

            var el = document.createElement('div');
            el.className = layer.class + " marker";
            el.title = marker.name;
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);

            // Create a var containing all links as a geojson lines collection
            var lineSource = 
            { 
                'type': 'FeatureCollection',
                'features': []
            };
            marker.links.forEach(function(link) {
                var geojson = 
                {
                    'type': 'Feature',
                    'properties' : {
                        "target": link.target,
                        "brief": link.brief,
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            marker.geometry.coordinates,
                            link.coordinates
                        ]
                    }
                }
                lineSource.features.push(geojson)
            });
        
            if (lineSource.features.length > 0) {

                // the source id is the first word of the marker name, concat with "-link".
                var linkId = marker.name.split(" ")[0] + "-link";
                map.addSource(linkId, {
                    'type': 'geojson',
                    'data': lineSource,
                })

                map.addLayer({
                    'id': linkId,
                    'type': 'line',
                    'source': linkId, 
                    'paint': {
                        'line-color': '#000',
                        'line-width': 4.5,
                        'line-opacity': 0.5
                    }
                });

                map.setLayoutProperty(linkId, 'visibility', 'none');

                console.debug("there are links");

                el.addEventListener("click", function(e) {
                    var visibility = map.getLayoutProperty(linkId, 'visibility');
                    if (visibility === 'visible') {
                        map.setLayoutProperty(linkId, 'visibility', 'none');
                    }
                    else {
                        map.setLayoutProperty(linkId, 'visibility', 'visible');
                    }
                });

                // Adding some paint dynamics over the lines
                var lineLeavePaint = function() {
                    map.setPaintProperty(linkId, 'line-width', 4.5);
                    map.setPaintProperty(linkId, 'line-opacity', 0.5);
                    map.getCanvas().style.cursor = '';

                }
                var lineOverPaint = function() {
                    map.setPaintProperty(linkId, 'line-width', 6.5);
                    map.setPaintProperty(linkId, 'line-opacity', 0.7);
                    map.getCanvas().style.cursor = 'pointer';

                }
                el.addEventListener("mouseover", lineOverPaint);
                el.addEventListener("mouseleave", lineLeavePaint);
                map.on('mouseover', linkId, lineOverPaint);
                map.on('mouseleave', linkId, lineLeavePaint);

                // Displaying popups when line is clicked
                map.on('click', linkId, function(e) {
                    
                    var line = e.features[0];
                    console.debug(line);
                    // we calculate the middle between the points where the popup will be displayed
                    var x = (line.geometry.coordinates[0][0] + line.geometry.coordinates[1][0]) / 2;
                    var y = (line.geometry.coordinates[0][1] + line.geometry.coordinates[1][1]) / 2;
                    var popupClass = marker.name.split(" ")[0] + "-popup";
                    var popup = new mapboxgl.Popup({ closeOnClick: true })
                        .setLngLat([x, y])
                        .setHTML(
                            "<p>" + line.properties.brief + "</p><p>[<a class=\"source-link\" href=\"" + "#" + "\">source<a>]</p>"
                        )
                        .addTo(map);
                    popup.addClassName(popupClass)
                });

            }

        });

        
        // Adding element to the filter list associated with the current layer
        var li = document.createElement('li');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = "checkbox-input";
        input.checked = true;
        input.id = layer.id + "-id";
        li.appendChild(input)
    
        var label = document.createElement('label');
        label.setAttribute('for', layer.id + "-id");
        label.textContent = layer.name;
        li.appendChild(label);

        var dot = document.createElement('span');
        dot.className = layer.id + "-dot";
        li.appendChild(dot)

        filterGroup.appendChild(li);

        
        // Enable interaction with the checkbox input
        input.addEventListener('change', function(e) {
            var markers = document.getElementsByClassName(layer.class);
            for (var i = 0, len = markers.length; i < len; i++) {
                var visibility = markers[i].style.display;
                if (visibility == 'none') {
                    markers[i].style.display = "block";
                }
                else {
                    markers[i].style.display = "none";
                }
            }
        });

    }); // layer collection foreach
    
}); // map on load