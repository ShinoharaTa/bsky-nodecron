import BskyUtils from "../common/bsky.js";

export default class system {
  bsky = null;
  constructor(author, pass) {
    this.bsky = new BskyUtils("https://bsky.social", author, pass);
  }

  process = async () => {
    await this.bsky.login();
    await this.bsky.post("@shino3.bsky.social\nsystem: batch startup");
  };
}
