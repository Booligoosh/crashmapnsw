<template>
  <div class="file-upload">
    <div
      class="file-upload-btns"
      :style="{ gridTemplateColumns: hasFile ? '1fr 1fr' : '1fr' }"
    >
      <label for="gpx-upload" class="gpx-btn">{{
        hasFile ? "Replace route" : "Upload GPX route"
      }}</label>
      <input
        id="gpx-upload"
        ref="gpxUpload"
        class="gpx-btn-input"
        type="file"
        accept="application/gpx+xml"
        @change="onFileChange"
      />
      <button class="gpx-btn remove" v-if="hasFile" @click="removeFile">
        Remove route
      </button>
    </div>
  </div>
</template>

<script>
import toGeojson from "@mapbox/togeojson";

export default {
  computed: {
    hasFile() {
      return !!this.$store.state.routeCoords;
    },
  },
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
    removeFile() {
      this.$refs.gpxUpload.value = null;
      this.$store.commit("setRouteCoords", null);
    },
  },
};
</script>
cursor: pointer;

<style lang="scss">
.file-upload {
  border-top: 1px solid #ddd;
  background: hsl(0, 0%, 99%);

  &-btns {
    display: grid;
    grid-gap: 0.5rem;

    .gpx-btn {
      font: inherit;
      border: none;
      display: block;
      cursor: pointer;
      background: hsl(120, 50%, 53%);
      color: white;
      border-radius: 5px;
      padding: 0.5rem;
      text-align: center;
      font-weight: 500;
      background: #2c3e50;
      box-shadow: 0 3px 7px -4px black;

      &.remove {
        background: hsl(210, 29%, 80%);
        color: inherit;
        box-shadow: none;
      }

      &-input {
        display: none;
      }
    }
  }
}
</style>
