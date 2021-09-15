import cron from "node-cron";
import { cronConfig } from "../configs/cron.config";

const { jobSchedule } = cronConfig;

cron.schedule(jobSchedule, () => {
  console.log("Batch forwarding transactions");
});
