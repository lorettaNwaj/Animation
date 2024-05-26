
// Create a map with the Esri Terrain basemap
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions: 'Esri, HERE, Garmin, FAO, NOAA, USGS, Intermap, METI, © OpenStreetMap contributors, and the GIS User Community',
                url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
                crossOrigin: 'Anonymous'
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-98.35, 39.50]),
        zoom: 4
    })
});

// Vector source and layer to display the shapefiles
const vectorSource = new ol.source.Vector();

const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })
});

map.addLayer(vectorLayer);

// Mapping years to GeoJSON file paths
const shapefiles = {
    1800: 'states1800.json',
    1810: 'states1810.json',
    1820: 'states1820.json',
    1830: 'states1830.json',
    1840: 'states1840.json',
    1850: 'states1850.json',
    1860: 'states1860.json',
    1870: 'states1870.json',
    1880: 'states1880.json'
};

// Function to load and display a shapefile for a given year
function loadShapefile(year) {
    fetch(shapefiles[year])
        .then(response => response.json())
        .then(data => {
            vectorSource.clear();
            const features = new ol.format.GeoJSON().readFeatures(data, {
                featureProjection: 'EPSG:3857'
            });
            vectorSource.addFeatures(features);
        });
}

// Event listener for the slider
document.getElementById('slider').addEventListener('input', function () {
    const year = this.value;
    loadShapefile(year);
});

// Load the initial shapefile for the year 1800
loadShapefile(1800);
