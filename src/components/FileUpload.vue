<template>
  <input type="file" accept="application/gpx+xml" @change="onFileChange" />
</template>

<script>
import toGeojson from "@mapbox/togeojson";

export default {
  methods: {
    async onFileChange(e) {
      const file = (e.target.files || e.dataTransfer.files)?.[0];

      if (!file) return this.$store.commit("setRouteCoords", null);
      console.log("FILE:", file);

      const fileContents = await file.text();
      console.log(fileContents);
      const parsedFileContents = new DOMParser().parseFromString(
        fileContents,
        "text/xml"
      );
      const geojson = toGeojson.gpx(parsedFileContents);
      console.log(geojson);

      const routeCoords = geojson?.features?.[0]?.geometry?.coordinates?.map?.(
        (c) => [c[1], c[0]] // Coords are in reverse
      );
      console.log(routeCoords);

      if (!routeCoords) return this.$store.commit("setRouteCoords", null);

      this.$store.commit("setRouteCoords", routeCoords);
    },
  },
};
</script>

<style></style>
