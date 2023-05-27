import axios from "axios";
import casters from "./casters.js";
import BskyUtils from "../common/bsky.js";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class wnlive {
  bsky = null;
  constructor() {
    dotenv.config({ path: `${__dirname}/.env` });
    const { AUTHOR, PASSWORD } = process.env;
    this.bsky = new BskyUtils("https://bsky.social", AUTHOR, PASSWORD);
  }

  process = async () => {
    const response = await axios.get(
      "http://smtgvs.weathernews.jp/a/solive_timetable/timetable.json"
    );
    const timetables = response.data;
    let message = "";
    for (let timetable of timetables) {
      let caster = "";
      if (timetable.caster !== "") {
        if (timetable.caster in casters) {
          caster = casters[timetable.caster];
        } else {
          caster = timetable.caster;
        }
      } else {
        caster = "公式チャンネル";
      }
      message += "■ " + timetable["hour"] + "～ （" + caster + "）\n";
      message +=
        "　" +
        (timetable["title"].replace("ウェザーニュースLiVE", "") !== ""
          ? timetable["title"].replace("ウェザーニュース", "")
          : "放送待機") +
        "\n\n";
    }
    message = message.replace(/\n\n$/, "");
    await this.bsky.login();
    await this.bsky.post(message);
  };
}
