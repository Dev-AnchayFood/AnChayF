import cron from "node-cron";

import fetchData from "./webScrapping";

const scheduleCronJob = () => {
  cron.schedule("*/2 * * * *", async function () {
    console.log("Running scrapping");
    await fetchData();
  });
};

export default scheduleCronJob;
