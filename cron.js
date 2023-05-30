import * as cron from "node-cron";
import dotenv from "dotenv";
import wnlive from "./wnlive-schedule/wnlive.js";
import jiho from "./jiho/jiho.js"
import system from "./system/system.js"

dotenv.config();
const { JIHO_AUTHOR, JIHO_PASSWORD } = process.env;
const { WNLIVE_AUTHOR, WNLIVE_PASSWORD } = process.env;
const { SYSTEM_AUTHOR, SYSTEM_PASSWORD } = process.env;

let wn = new wnlive(WNLIVE_AUTHOR, WNLIVE_PASSWORD);
let jh = new jiho(JIHO_AUTHOR, JIHO_PASSWORD);

// システム起動通知
let sys = new system(SYSTEM_AUTHOR, SYSTEM_PASSWORD);
sys.process();

cron.schedule("45 18 * * *", wn.process);
cron.schedule("25 8 * * *", wn.process);
cron.schedule("57,27 * * * *", jh.process);
