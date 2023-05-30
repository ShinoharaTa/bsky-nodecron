import moment from "moment-timezone";
import BskyUtils from "../common/bsky.js";

export default class jiho {
  bsky = null;
  constructor(author, pass) {
    this.bsky = new BskyUtils("https://bsky.social", author, pass);
  }

  process = async () => {
    const waitTime = Math.floor(Math.random() * 3000); // 0~300000ミリ秒（5分）のランダムな値
    setTimeout(async () => {
      console.log(waitTime)
      const time = moment().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss");
      //   post("なう(" + time + ")");
      await this.bsky.login();
      await this.bsky.post("なう(" + time + ")");
    }, waitTime);
  };
}
