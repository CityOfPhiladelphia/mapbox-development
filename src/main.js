import Vue from 'vue'
import App from './components/App.vue'
import createStore from './store';
import configMixin from './util/config-mixin';

import 'phila-standards/dist/css/phila-app.min.css';
// import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css';

let config = {
  map: {
    containerClass: null,
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels'
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water'
      },
      imagery2019: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer',
        label: '2019',
        tiledLayers: [
          'imageryBasemapLabels',
          'parcels'
        ],
        type: 'imagery',
        year: 2019,
        attribution: 'Imagery 2019'
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
      dorBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/DORBasemap_Labels/MapServer',
        zIndex: '3',
      },
      imageryBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer',
        zIndex: '3',
        attribution: 'overwrite',
      },
    }
  }
};
Vue.use(configMixin, config);

const store = createStore();

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
