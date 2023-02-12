<template>
  <div class="welcome-content">
    <h3>Welcome!</h3>
    <p>
      This map shows crashes that occurred between 2017-2021 involving
      <strong>bicycles</strong>.
    </p>
    <p>
      The data was collected by
      <a
        href="https://roadsafety.transport.nsw.gov.au/statistics/interactivecrashstats/lga_stats.html"
        target="_blank"
        >Transport for NSW</a
      >. It only includes crashes that were reported to the police and involved
      an injury or tow-away.
    </p>
    <!-- <ul>
      <li>Were reported to police</li>
      <li>Occurred on a road open to the public</li>
      <li>Involved at least one moving road vehicle</li>
      <li>
        Involved at least one person being killed or injured or at least one
        motor vehicle being towed away.
      </li>
    </ul> -->
    <p>
      The dots on the map show the locations of crashes.
      <strong>Click on a dot to see more information about the crash.</strong>
      Dots are coloured based on the severity of the crash, as defined below.
    </p>
    <h3>Crash severities</h3>
    <p>
      <em>
        *These definitions are summarised for simplicity. See the
        <a href="/data-manual.pdf" target="_blank">data manual</a> (pg4) for
        full definitions.
      </em>
    </p>
    <dl>
      <div>
        <dt><InlineColorDot :color="DEGREE_COLOR_MAP['Fatal']" /> Fatal</dt>
        <dd>Someone was killed</dd>
      </div>
      <div>
        <dt>
          <InlineColorDot :color="DEGREE_COLOR_MAP['Serious Injury']" /> Serious
          Injury injury
        </dt>
        <dd>
          Someone was admitted to hospital on the same day or day after the
          crash
        </dd>
      </div>
      <div>
        <dt>
          <InlineColorDot :color="DEGREE_COLOR_MAP['Moderate Injury']" />
          Moderate Injury
        </dt>
        <dd>
          Someone attended the emergency department (but was not admitted to
          hospital) on the same day or day after the crash
        </dd>
      </div>
      <div>
        <dt>
          <InlineColorDot :color="DEGREE_COLOR_MAP['Minor/Other Injury']" />
          Minor/Other Injury
        </dt>
        <dd>
          Someone was identified as an injury in the Police crash report data,
          but was not was admitted to hospital or attended the emergency
          department
        </dd>
      </div>
      <div>
        <dt>
          <InlineColorDot :color="DEGREE_COLOR_MAP['Uncategorised Injury']" />
          Uncategorised Injury
        </dt>
        <dd>
          Someone was identified as an injury in the Police crash report data,
          but data could not be linked with health records
        </dd>
      </div>
      <div>
        <dt>
          <InlineColorDot :color="DEGREE_COLOR_MAP['Non-casualty (towaway)']" />
          Non-casualty (towaway)
        </dt>
        <dd>
          No one was killed or injured but at least one motor vehicle was towed
          away
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { DEGREE_COLOR_MAP } from "../constants";
import InlineColorDot from "./InlineColorDot.vue";

export default {
  components: { InlineColorDot },
  data() {
    return { DEGREE_COLOR_MAP };
  },
};
</script>

<style lang="scss">
.welcome-content {
  strong {
    font-weight: 600;
  }
}
</style>
