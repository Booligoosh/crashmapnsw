<template>
  <div class="welcome-content">
    <h3>Welcome!</h3>
    <p>
      This map shows crashes that occurred between 2016-2020 involving
      <strong>bicycles</strong>.
    </p>
    <p>
      The data was collected by Transport for NSW, and you can view the same
      data
      <a
        href="https://roadsafety.transport.nsw.gov.au/statistics/interactivecrashstats/lga_stats.html"
        target="_blank"
        >on their website</a
      >.
    </p>
    <p>
      The dots on the map show the locations of crashes, coloured based on the
      severity of the crash. You can read the definitions below.
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
