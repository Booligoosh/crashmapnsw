<template>
  <l-map
    class="leaflet-container"
    :center="[
      /* Centre of Sydney from OpenStreetMap https://www.openstreetmap.org/node/13766899 */
      -33.8698439,
      151.2082848,
    ]"
    :zoom="14"
    :zoomAnimation="true"
    :options="{ preferCanvas: true }"
    ref="map"
    @ready="updateMapMarkers"
    @click="handleClick"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="Detailed map style"
      :max-zoom="19"
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    ></l-tile-layer>
    <l-tile-layer
      url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      layer-type="base"
      name="Cycling map style"
      :max-zoom="20"
      attribution="<a href='https://github.com/cyclosm/cyclosm-cartocss-style/releases' title='CyclOSM - Open Bicycle render'>CyclOSM</a> | Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      :visible="false"
    ></l-tile-layer>
    <l-tile-layer
      url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
      layer-type="base"
      name="Minimal map style"
      :min-zoom="0"
      :max-zoom="18"
      attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      subdomains="abcd"
      :opacity="0.8"
      :visible="false"
    ></l-tile-layer>
    <l-tile-layer
      url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png"
      layer-type="overlay"
      name="Show cycle infrastructure"
      :max-zoom="20"
      attribution="<a href='https://github.com/cyclosm/cyclosm-cartocss-style/releases' title='CyclOSM - Open Bicycle render'>CyclOSM</a> | Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      :visible="false"
    ></l-tile-layer>
    <l-control-layers />
    <l-polyline
      v-if="$store.state.routeCoords"
      :lat-lngs="$store.state.routeCoords"
      color="#4bc34b"
      ref="route"
      @ready="handleRouteReady"
    />
  </l-map>
</template>

<script>
import crashes from "../data/built/crashes.json";
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LCircleMarker,
  LControlLayers,
  LMarker,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import * as L from "leaflet/dist/leaflet-src.esm"; // for some reason `from "leaflet"` doesn't work
import { DEGREE_COLOR_MAP } from "../constants";

const MARKER_RADIUS = 8;
const MARKER_RADIUS_SELECTED = 14;

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControlLayers,
    LMarker,
    LPolyline,
  },
  data() {
    return {
      crashes,
      selectedMarker: null,
    };
  },
  methods: {
    handleClick(e) {
      // https://github.com/vue-leaflet/vue-leaflet/issues/220#issuecomment-1220709915
      if (!e.latlng) return;

      // https://github.com/Leaflet/Leaflet/issues/4882#issuecomment-244751897
      L.DomEvent.stopPropagation(e);

      // Make previously selected marker smaller again
      if (this.selectedMarker)
        this.selectedMarker.setStyle({ radius: MARKER_RADIUS });

      const crashId = e.propagatedFrom?.options.crashId;

      // If we clicked on a crash that's not already selected, select that crash
      if (crashId && crashId !== this.$store.state.currentCrash?.id) {
        // Make newly selected marker larger
        e.propagatedFrom.setStyle({ radius: MARKER_RADIUS_SELECTED });
        // Store newly selected marker so we can make it smaller when the next one's clicked
        this.selectedMarker = e.propagatedFrom;
        // Find crash that matches the marker clicked
        const crash = crashes.find((c) => c.id === crashId);
        // Set crash in global state
        this.$store.commit("setCurrentCrash", crash);
      } else {
        // If there is no crash ID or we clicked on the already-selected crash, clear selection
        this.selectedMarker = null;
        this.$store.commit("setCurrentCrash", null);
      }
    },
    handleRouteReady() {
      if (this.$refs.route && this.$refs.map) {
        const bounds = this.$refs.route.leafletObject.getBounds();
        const map = this.$refs.map.leafletObject;
        map.flyToBounds(bounds);
      }
    },
    // Using this rather than <l-circle-marker> for performance reasons.
    // vue-leaflet can't handle advanced logic like bulk rendering (featureGroup) or selective updates
    updateMapMarkers() {
      const map = this.$refs.map.leafletObject;

      const markersArray = crashes.map((crash) =>
        L.circleMarker([crash.lat, crash.lon], {
          radius: MARKER_RADIUS,
          color: DEGREE_COLOR_MAP[crash.deg],
          fillColor: DEGREE_COLOR_MAP[crash.deg],
          fill: true,
          fillOpacity: 0.8,
          // Business logic option, not a leaflet option:
          crashId: crash.id,
        })
      );

      const featureGroup = L.featureGroup(markersArray).addTo(map);
      featureGroup.on("click", this.handleClick);
    },
  },
};
</script>

<style lang="scss">
.leaflet-container {
  background: transparent;
}
</style>
