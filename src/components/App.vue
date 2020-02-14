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
      <!-- <mb-raster-layer
        :url="'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer'"
      >
      </mb-raster-layer> -->
      <mb-icon
        :url="'https://mapboard-images.s3.amazonaws.com/camera.png'"
        :name="'camera'"
      >
      </mb-icon>
      <mb-measure-tool>
      </mb-measure-tool>
    </mb-map>
  </div>
</template>

<script>

import Map_ from '@phila/vue-mapping/src/leaflet/Map.vue';
import MbMap from '@phila/vue-mapping/src/mapbox/MbMap.vue';
import MbRasterLayer from '@phila/vue-mapping/src/mapbox/MbRasterLayer.vue';
import MbIcon from '@phila/vue-mapping/src/mapbox/MbIcon.vue';
import MbMeasureTool from '@phila/vue-mapping/src/mapbox/MbMeasureTool.vue';

export default {
  name: 'app',
  components: {
    MbMap,
    MbRasterLayer,
    MbIcon,
    MbMeasureTool,
    // Map_,
    // EsriTiledMapLayer: () => import(/* webpackChunkName: "mbmp_pvm_EsriTiledMapLayer" */'@phila/vue-mapping/src/esri-leaflet/TiledMapLayer.vue'),
  },
  data() {
    return {
      url: 'CityImagery_2019_3in'
    };
  },
  created() {
    this.$store.commit('setBasemap', 'pwd');
  },
  mounted() {
    console.log('App.vue mounted, this.$config:', this.$config);
  },
  watch: {
    activeBasemap() {
      console.log('watch activeBasemap is firing');
      let map = this.$store.state.map.map;
      map.setStyle(this.mapboxStyle);
    }
  },
  computed: {
    mapboxStyle() {
      console.log('App.vue mapboxStyle computed, this.activeBasemap:', this.activeBasemap, 'this.$config:', this.$config);
      let value;
      value = {
        version: 8,
        sources: {
          basemap: {
            type: "raster",
            tiles: [
              this.$config.map.basemaps[this.activeBasemap].url + '/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          },
          basemapLabels: {
            type: "raster",
            tiles: [
              this.$config.map.tiledLayers[this.$config.map.basemaps[this.activeBasemap].tiledLayers[0]].url + '/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          },

        },
        layers: [
          {
            id: "basemap",
            type: "raster",
            source: "basemap",
            minzoom: 0,
            maxzoom: 22
          },
          {
            id: "basemapLabels",
            type: "raster",
            source: "basemapLabels",
            minzoom: 0,
            maxzoom: 22
          },

        ]
      };
      return value;
    },
    mapCenter() {
      return [-75.163471, 39.953338];
    },
    mapZoom() {
      return 18;
    },
    activeBasemap() {
      return this.$store.state.map.basemap;
    },
    tiledLayers() {
      const activeBasemap = this.activeBasemap;
      const activeBasemapConfig = this.configForBasemap(activeBasemap);
      return activeBasemapConfig.tiledLayers || [];
    },
  },
  methods: {
    toggleBasemap() {
      if (this.activeBasemap === 'pwd') {
        this.$store.commit('setBasemap', 'imagery2019');
      } else {
        this.$store.commit('setBasemap', 'pwd');
      }
      // this.$data.url = 'CityBasemap';
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
  height: 600px;
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
