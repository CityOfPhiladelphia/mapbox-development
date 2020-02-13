<template>
  <div id="app">
    <!-- <map_
      id="map-tag"
      :center="mapCenter"
      :zoom="mapZoom"
      attribution-position="bottomright"
      zoom-control-position="bottomright"
    >
      <esri-tiled-map-layer
        v-for="(basemap, key) in this.$config.map.basemaps"
        v-if="activeBasemap === key"
        :key="key"
        :url="basemap.url"
        :max-zoom="basemap.maxZoom"
        :attribution="basemap.attribution"
      />

      <esri-tiled-map-layer
        v-for="(tiledLayer, key) in this.$config.map.tiledLayers"
        v-if="tiledLayers.includes(key)"
        :key="key"
        :url="tiledLayer.url"
        :z-index="tiledLayer.zIndex"
        :attribution="tiledLayer.attribution"
      />

    </map_> -->
    <button
      @click="toggleBasemap"
    >
      toggle basemap
    </button>
    <mb-map
      id="mbmap-container"
      :container="'mbmap-container'"
      :style_="mapboxStyle"
      :center="mapCenter"
      :zoom="mapZoom"
    >
    </mb-map>
  </div>
</template>

<script>

import Map_ from '@phila/vue-mapping/src/leaflet/Map.vue';
import MbMap from '@phila/vue-mapping/src/mapbox/MbMap.vue';

export default {
  name: 'app',
  components: {
    MbMap,
    // Map_,
    // EsriTiledMapLayer: () => import(/* webpackChunkName: "mbmp_pvm_EsriTiledMapLayer" */'@phila/vue-mapping/src/esri-leaflet/TiledMapLayer.vue'),
  },
  data() {
    return {
      url: 'CityImagery_2019_3in'
    };
  },
  mounted() {
    console.log('App.vue mounted, this.$config:', this.$config);
  },
  computed: {
    mapboxStyle() {
      return {
        version: 8,
        sources: {
          worldImagery: {
            type: "raster",
            tiles: [
              'http://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/' + this.$data.url + '/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: "worldImagery",
            type: "raster",
            source: "worldImagery",
            minzoom: 0,
            maxzoom: 22
          }
        ]
      };
    },
    // mapboxStyle() {
    //   return {
    //     version: 8,
    //     sources: {
    //       worldImagery: {
    //         type: "raster",
    //         tiles: [
    //           'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}'
    //         ],
    //         tileSize: 256
    //       }
    //     },
    //     layers: [
    //       {
    //         id: "worldImagery",
    //         type: "raster",
    //         source: "worldImagery",
    //         minzoom: 0,
    //         maxzoom: 22
    //       }
    //     ]
    //   };
    // },
    mapCenter() {
      return [-75.163471, 39.953338];
    },
    mapZoom() {
      return 18;
    },
    activeBasemap() {
      return 'pwd';
    },
    tiledLayers() {
      const activeBasemap = this.activeBasemap;
      const activeBasemapConfig = this.configForBasemap(activeBasemap);
      return activeBasemapConfig.tiledLayers || [];
    },
  },
  methods: {
    toggleBasemap() {
      this.$data.url = 'CityBasemap';
      // map.setStyle
    },
    configForBasemap(basemap) {
      return this.$config.map.basemaps[basemap] || {};
    },
  }
}
</script>

<style>
#app {
  height: 400px;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

#map-tag {
  height: 100%;
}

</style>
