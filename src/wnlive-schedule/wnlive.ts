import axios from "axios";
import BskyUtils from "../common/bsky";
import casters from "./casters";

export default class wnlive {
  bsky: BskyUtils;
  constructor(author: string, pass: string) {
    this.bsky = new BskyUtils("https://bsky.social", author, pass);
  }

  process = async () => {
    const response = await axios.get(
      "http://smtgvs.weathernews.jp/a/solive_timetable/timetable.json",
    );
    const timetables = response.data;
    console.log(timetables);
    let message = "";
    message += "■ これからのスケジュールをお知らせします。\n\n";
    for (const timetable of timetables) {
      let caster = "";
      if (timetable.caster !== "") {
        if (timetable.caster in casters) {
          // @ts-ignore
          caster = casters[timetable.caster];
        } else {
          caster = timetable.caster;
        }
      } else {
        caster = "公式チャンネル";
      }

      if (timetable.title.replace("ウェザーニュースLiVE", "") !== "") {
        message += `${timetable.hour}～ （${caster}）\n`;
      }
    }
    message = message.replace(/\n\n$/, "");
    console.log(message);
    await this.bsky.login();
    await this.bsky.post(message);
  };
}
