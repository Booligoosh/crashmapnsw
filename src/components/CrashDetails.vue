<template>
  <div class="crash-details-placeholder" v-if="!crash">
    Please select a crash
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
        <dd>{{ crash.weather }}</dd>
      </div>

      <div>
        <dt>Road condition</dt>
        <dd>{{ crash.surfaceCondition }}</dd>
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
        <dt>Speed limit</dt>
        <dd>{{ crash.speedLimit }}</dd>
      </div>

      <div>
        <dt>Road surface</dt>
        <dd>{{ crash.roadSurface }}</dd>
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
        <dt>Road user movement code</dt>
        <dd>
          {{ crash.rumCode }} (<a href="/rumTable.png" target="_blank"
            >see table</a
          >)
        </dd>
      </div>
      <div>
        <dt>Road user movement description</dt>
        <dd>{{ crash.rumDescription }}</dd>
      </div>
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
    </dl>

    <div v-for="unit of crash.units" :key="unit.id" class="crash-participant">
      <h5>
        <u>Participant {{ unit.id }}</u>
        <span
          :style="{
            color:
              unit.role === 'Key traffic unit'
                ? '#630'
                : unit.role === 'Other traffic unit'
                ? '#0066fd'
                : 'transparent',
          }"
        >
          ●
        </span>
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

    <details>
      <summary>All attributes (dev)</summary>
      <pre>{{ JSON.stringify(crash, null, 2) }}</pre>
    </details>
  </div>
</template>

<script>
export default {
  computed: {
    crash() {
      return this.$store.state.currentCrash;
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
  },
  methods: {
    listIfExists(items) {
      return items.filter((x) => !!x).join(", ");
    },
  },
};
</script>

<style lang="scss">
.crash-details {
  overflow-y: auto;
  overflow-x: hidden;

  pre {
    overflow-x: auto;
  }

  dl {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    > div {
      font-size: 0.9rem;

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      dt {
        display: inline;
        font-weight: 600;

        &:after {
          content: ": ";
        }
      }

      dd {
        display: inline;
        margin: 0;
      }
    }
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
}
</style>
