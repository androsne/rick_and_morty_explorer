import "./css/styles.css";
import { initApp } from "./js/app.js";

initApp();

import { getLocations } from "./js/api.js";

getLocations().then((data) => {
  console.log("Locations:", data);
});
