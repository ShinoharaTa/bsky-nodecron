import BskyUtils from "../common/bsky.js";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class system {
  bsky = null;
  constructor() {
    dotenv.config({ path: `${__dirname}/.env` });
    const { AUTHOR, PASSWORD } = process.env;
    this.bsky = new BskyUtils("https://bsky.social", AUTHOR, PASSWORD);
  }

  process = async () => {
    await this.bsky.login();
    await this.bsky.post("@shino3.bsky.social\nsystem: batch startup");
  };
}
