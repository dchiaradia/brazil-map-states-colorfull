import { brazilianStates } from './states.js';
import { brasilianCities } from './cities.js';
import { conections } from './conections.js';

var data = {
    brazilianStates: brazilianStates,
    brasilianCities: brasilianCities,
    conections: conections,
    getStatesGeoJson: async function getStatesGeoJson() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open("GET", "data/brazil-states.geojson", true);
            xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                const geoJsonData = JSON.parse(xhr.responseText);
                resolve(geoJsonData);
                } else {
                reject(new Error(`Failed to load GeoJSON. Status code: ${xhr.status}`));
                }
            }
            };
            xhr.send(null);
        });
        }
      
};

export { data };
