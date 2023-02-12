const fs = require("fs");
const xlsx = require("xlsx");

const FILE_PREFIX = "NSW_Road_Crash_Data_2017-2021_";

const trafficUnitData = getJsonFromExcelFile(FILE_PREFIX + "TRAFFIC_UNIT.xlsx");
console.log(trafficUnitData[0]);
const trafficUnitsByCrashId = {};
trafficUnitData.forEach((trafficUnitRow) => {
  const crashId = trafficUnitRow["Crash ID"];
  if (!trafficUnitsByCrashId[crashId]) trafficUnitsByCrashId[crashId] = [];
  trafficUnitsByCrashId[crashId].push(trafficUnitRow);
});

const crashData = getJsonFromExcelFile(FILE_PREFIX + "CRASH.xlsx");
console.log(crashData[0]);
console.time("Map crashes");
const crashes = crashData
  .filter(
    (crashRow) =>
      crashRow["Key TU type"] === "Pedal cycle" ||
      crashRow["Other TU type"] === "Pedal cycle"
  )
  .map((crashRow) => ({
    id: crashRow["Crash ID"],
    lat: crashRow["Latitude"],
    lon: crashRow["Longitude"],
    deg: crashRow["Degree of crash - detailed"],
    streetName: capitalise(
      crashRow["Street of crash"] + " " + crashRow["Street type"]
    ),
    suburb: capitalise(crashRow["Town"]),
    month: crashRow["Month of crash"],
    year: crashRow["Year of crash"],
    time: crashRow["Two-hour intervals"],
    dayOfWeek: crashRow["Day of week of crash"],
    locationType: crashRow["Type of location"],
    permanentFeat: crashRow["Primary permanent feature"],
    temporaryFeat: crashRow["Primary temporary feature"],
    hazardousFeat: crashRow["Primary hazardous feature"],
    roadSurface: crashRow["Road surface"],
    surfaceCondition: crashRow["Surface condition"],
    weather: crashRow["Weather"],
    naturalLighting: crashRow["Natural lighting"],
    streetLighting: crashRow["Street lighting"],
    speedLimit: crashRow["Speed limit"],
    rumCode: crashRow["RUM - code"],
    rumDescription: crashRow["RUM - description"],
    fatalities: crashRow["No. killed"],
    seriousInjuries: crashRow["No. seriously injured"],
    moderateInjuries: crashRow["No. moderately injured"],
    minorInjuries: crashRow["No. minor-other injured"],
    units: (trafficUnitsByCrashId[crashRow["Crash ID"]] || []).map(
      (trafficUnitRow) => ({
        id: trafficUnitRow["Traffic unit ID"],
        type: trafficUnitRow["TU type group"],
        role: trafficUnitRow["TU role in first impact"],
        street:
          trafficUnitRow["Street of travel"] === "Street of crash"
            ? capitalise(
                crashRow["Street of crash"] + " " + crashRow["Street type"]
              )
            : trafficUnitRow["Street of travel"] === "In ID feature"
            ? capitalise(
                crashRow["Identifying feature"] +
                  " " +
                  crashRow["Identifying feature type"]
              )
            : trafficUnitRow["Street of travel"],
        direction: trafficUnitRow["Direction of travel"],
        status: trafficUnitRow["Manoeuvre"],
        objectHit1: trafficUnitRow["Object hit 1"],
        objectHit2: trafficUnitRow["Object hit 1"],
      })
    ),
    // All values, for development purposes. Remove later:
    data: crashRow,
    unitData: trafficUnitsByCrashId[crashRow["Crash ID"]] || [],
  }));
console.timeEnd("Map crashes");
console.time("Write crashes file");
fs.writeFileSync(
  `${__dirname}/src/data/built/crashes.json`,
  JSON.stringify(crashes)
);
console.timeEnd("Write crashes file");

function getJsonFromExcelFile(fileName) {
  console.time(`Read ${fileName}`);
  const file = xlsx.readFile(`${__dirname}/src/data/sources/${fileName}`);
  console.timeEnd(`Read ${fileName}`);
  console.time(`Convert ${fileName} to json`);
  const jsonData = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  console.timeEnd(`Convert ${fileName} to json`);
  return jsonData;
}

function capitalise(str) {
  return str
    .split(" ")
    .map(
      (chunk) => chunk.slice(0, 1).toUpperCase() + chunk.slice(1).toLowerCase()
    )
    .join(" ");
}
