import * as cron from "node-cron";
import wnlive from "./wnlive-schedule/wnlive.js";
import jiho from "./jiho/jiho.js"
import system from "./system/system.js"

let wn = new wnlive();
let jh = new jiho();

// システム起動通知
let sys = new system();
sys.process();

cron.schedule("45 18 * * *", wn.process);
cron.schedule("25 8 * * *", wn.process);
cron.schedule("57,27 * * * *", jh.process);
