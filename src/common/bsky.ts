import { BskyAgent, RichText } from "@atproto/api";
import { Record } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import { Main } from "@atproto/api/dist/client/types/com/atproto/repo/strongRef";

export default class BskyUtils {
  identifier: string;
  password: string;
  agent: BskyAgent | null = null;
  constructor(service: string | URL, identifier: string, password: string) {
    this.identifier = identifier;
    this.password = password;
    this.agent = new BskyAgent({ service: service });
  }
  login = async () => {
    try {
      if (!this.agent) throw new Error("agent not initialized");
      await this.agent.login({
        identifier: this.identifier,
        password: this.password,
      });
    } catch ($ex) {
      console.error($ex);
    }
    return;
  };

  post = async (text: string, reply?: Main) => {
    if (!this.agent) return null;
    try {
      const rt = new RichText({ text });
      await rt.detectFacets(this.agent);
      const params: Partial<Record> & Omit<Record, "createdAt"> = {
        $type: "app.bsky.feed.post",
        text: rt.text,
        facets: rt.facets,
      };
      if (reply) {
        params.reply = { parent: reply, root: reply };
      }
      const response = await this.agent.post(params);
      return response;
    } catch ($ex) {
      console.error($ex);
    }
    return null;
  };
}
