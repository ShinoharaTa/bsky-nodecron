import axios from "axios";
import * as cron from "node-cron";
import wnlive from "./wnlive-schedule/wnlive.js";

let wn = new wnlive();

wn.process();

cron.schedule("45 18 * * *", wn.process);
cron.schedule("25 8 * * *", wn.process);
