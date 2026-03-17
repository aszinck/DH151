var map = L.map('map').setView([34.0697,-118.4432], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let travels = [
    {
        destination: 'Rotterdam Centraal',
        lat:51.923,
        lon:4.470,
        description: 'First date'
    },
    {
        destination: 'Interlaken',
        lat:46.6927,
        lon:7.8719,
        description: 'Engagement'
    },
    {
        destination: 'Stockholm',
        lat:59.316,
        lon:18.074,
        description: 'Honeymoon'
    },
    {
        destination: 'Skjoldsvej',
        lat:56.037,
        lon:12.5919,
        description: 'First house'
    }
]

// function to fly to a location by a given id number
function flyToIndex(element){
	map.flyTo([travels[element].lat,travels[element].lon],14)
    myMarkers.getLayers()[element].openPopup()
}

// // function to fly to a location by a given id number
// function flyByIndex(index){
// 	map.flyTo([data[index].lat,data[index].lon],12)

// 	// open the popup
// 	myMarkers.getLayers()[index].openPopup()
// }

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

travels.forEach(function(element,index){
    // create marker
    let marker = L.marker([element.lat,element.lon]).addTo(map)
        .bindPopup(element.destination+'<br>'+element.description)
        .openPopup();

    // add marker to featuregroup
	myMarkers.addLayer(marker)

    // add data to sidebar
    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${element.description}</div>`)
});

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"DAS journey": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

// travels.forEach(function(element,index){
//     L.marker([element.lat,element.lon]).addTo(map)
//         .bindPopup(element.destination+'<br>'+element.description)
//         .openPopup();
//     // add data to sidebar
// 	// $('.sidebar').append(element.description)
//     // Below are two examples of doing the same. But the second omits the use of a lot of double quotation
//     // $('.sidebar').append('<div class="sidebar-item">'+element.description+'</div>')
//     $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${element.description}</div>`)
// });

