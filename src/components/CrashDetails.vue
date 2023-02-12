<template>
  <div class="crash-details-placeholder" v-if="!crash">
    <WelcomeContent />
  </div>
  <div class="crash-details" v-else>
    <h3>
      Cycle crash on {{ crash.streetName }}, {{ crash.suburb }} in
      {{ crash.month }}
      {{ crash.year }}
    </h3>

    <h4>Conditions:</h4>
    <dl>
      <div>
        <dt>Lighting</dt>
        <dd>{{ crash.naturalLighting }}, {{ streetLightingText }}</dd>
      </div>

      <div>
        <dt>Time</dt>
        <dd>{{ crash.time }} on a {{ crash.dayOfWeek }}</dd>
      </div>

      <div>
        <dt>Weather</dt>
        <dd>{{ crash.weather }}, {{ surfaceConditionText }}</dd>
      </div>
    </dl>

    <h4>Location info:</h4>

    <dl>
      <div>
        <a
          :href="`http://maps.google.com/maps?layer=c&cbll=${crash.lat},${crash.lon}`"
          target="_blank"
        >
          Inspect on Google Street View ↗
        </a>
      </div>

      <div>
        <dt>Location type</dt>
        <dd>{{ crash.locationType }}</dd>
      </div>

      <div>
        <dt>Road type</dt>
        <dd>{{ crash.speedLimit }}, {{ crash.roadSurface }}</dd>
      </div>

      <div>
        <dt>Features involved</dt>
        <dd>
          {{
            listIfExists([
              crash.permanentFeat,
              crash.temporaryFeat,
              crash.hazardousFeat,
            ]) || "None"
          }}
        </dd>
      </div>
    </dl>

    <h4>Crash details:</h4>

    <dl>
      <div>
        <dt>Impact</dt>
        <dd>
          {{
            listIfExists([
              crash.fatalities &&
                crash.fatalities +
                  (crash.fatalities > 1 ? " fatalities" : " fatality"),
              crash.seriousInjuries &&
                crash.seriousInjuries + " seriously injured",
              crash.moderateInjuries &&
                crash.moderateInjuries + " moderately injured",
              crash.minorInjuries && crash.minorInjuries + " minorly injured",
            ]) || "None"
          }}
        </dd>
      </div>
      <div>
        <dt>Road user movement</dt>
        <dd>{{ crash.rumDescription }}</dd>
      </div>
      <img
        :src="`/rum/${crash.rumCode}.png`"
        :alt="crash.rumDescription"
        width="141"
        height="105"
        class="rum-img"
      />
    </dl>

    <div v-for="unit of crash.units" :key="unit.id" class="crash-participant">
      <h5>
        <u>Participant {{ unit.id }}</u>
        <InlineColorDot
          :color="
            unit.role === 'Key traffic unit'
              ? '#630'
              : unit.role === 'Other traffic unit'
              ? '#0066fd'
              : 'transparent'
          "
        />
      </h5>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>{{ unit.type }}</dd>
        </div>
        <div>
          <dt>Direction prior to crash</dt>
          <dd>{{ unit.direction }} on {{ unit.street }}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{{ unit.status }}</dd>
        </div>
      </dl>
    </div>

    <details v-if="isDev">
      <summary>All attributes (dev)</summary>
      <pre>{{ JSON.stringify(crash, null, 2) }}</pre>
    </details>
  </div>
</template>

<script>
import InlineColorDot from "./InlineColorDot.vue";
import WelcomeContent from "./WelcomeContent.vue";

export default {
  components: { WelcomeContent, InlineColorDot },
  computed: {
    crash() {
      return this.$store.state.currentCrash;
    },
    isDev() {
      return window.location.hostname === "localhost";
    },
    streetLightingText() {
      switch (this.crash.streetLighting) {
        case "On":
          return "Street lighting on";
        case "Off":
          return "Street lighting off";
        case "Nil":
          return "No street lighting";
        case "Unknown / not stated":
        default:
          return "Street lighting unknown";
      }
    },
    surfaceConditionText() {
      switch (this.crash.surfaceCondition) {
        case "Dry":
          return "Road surface dry";
        case "Wet":
          return "Road surface wet";
        case "Snow or ice":
          return "Road surface snowy or icy";
        case "Unknown / not stated":
        default:
          return "Road surface condition unknown";
      }
    },
  },
  methods: {
    listIfExists(items) {
      return items.filter((x) => !!x).join(", ");
    },
  },
};
</script>

<style lang="scss">
.crash-details,
.crash-details-placeholder {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.crash-details {
  pre {
    overflow-x: auto;
  }

  h3 {
    margin-top: 0;
  }

  h4 {
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }

  h5 {
    font-size: 0.9rem;
    margin-top: 0;
    margin-bottom: 0.5em;
  }

  .crash-participant {
    display: block;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }

  .rum-img {
    display: block;
    border: 1px solid;
  }
}
</style>
