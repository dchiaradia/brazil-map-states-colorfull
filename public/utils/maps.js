var gMapsOptions = {
    center: { lat: -11.938104, lng:  -55.090393 }, 
    zoom: 5,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
};

var gMaps = { 

    initialize: function initialize() {
        fetch('/api/google-maps-key')
        .then(response => response.text())
        .then(apiKey => {
          var script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        })
        .catch(error => {
          console.error('Error fetching API key:', error);
        });
    },

    createMap: function createMap(divName) {
        return  new google.maps.Map(document.getElementById(divName), gMapsOptions);
    },

    drawStates: function drawStates({states, geoJsonData, map}) { 
        states.forEach(function(estado) {
            const stateFeature = geoJsonData.features.find(feature => feature.properties.sigla === estado.sigla);
  
            if (stateFeature) {
              const stateCoordinates = stateFeature.geometry.coordinates[0][0];
  
              const statePolygon = new google.maps.Polygon({
                paths: stateCoordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
                strokeColor: '#000000',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: estado.cor,
                fillOpacity: 0.6
              });
  
              statePolygon.setMap(map);
            }
          });
    },

    drawCities: function drawCities({cities, map}) { 
        cities.forEach(function(cidade) {
            var squareSize = 0.15;
            var citySquare = new google.maps.Polygon({
              paths: [
                { lat: cidade.lat + squareSize, lng: cidade.lng - squareSize },
                { lat: cidade.lat + squareSize, lng: cidade.lng + squareSize },
                { lat: cidade.lat - squareSize, lng: cidade.lng + squareSize },
                { lat: cidade.lat - squareSize, lng: cidade.lng - squareSize }
              ],
              strokeColor: cidade.cor,
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: cidade.cor,
              fillOpacity: 0.6
            });
  
            citySquare.setMap(map);
          });
    },

    drawCitiesConnections: function drawCitiesConnections({connections, brasilianCities, map}) { 
        connections.forEach(function(conexao) {
            var cidadeInicio = brasilianCities.find(cidade => cidade.nome === conexao.inicio);
            var cidadeFim = brasilianCities.find(cidade => cidade.nome === conexao.fim);
  
            if (cidadeInicio && cidadeFim) {
              var cityLine = new google.maps.Polyline({
                path: [
                  { lat: cidadeInicio.lat, lng: cidadeInicio.lng },
                  { lat: cidadeFim.lat, lng: cidadeFim.lng }
                ],
                strokeColor: conexao.cor,
                strokeOpacity: 1,
                strokeWeight: 3,
                map: map
              });
            }
          });
    },

};

export { gMaps };
