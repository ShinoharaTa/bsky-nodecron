import pkg from "@atproto/api";
const { BskyAgent, RichText } = pkg;

export default class BskyUtils {
  identifier = null;
  password = null;
  agent = null;
  self = null;
  constructor(service, identifier, password) {
    this.identifier = identifier;
    this.password = password;
    this.agent = new BskyAgent({ service: service });
  }
  login = async () => {
    try {
      const { success, data } = await this.agent.login({
        identifier: this.identifier,
        password: this.password,
      });
      if (success) {
        this.self = data;
      }
    } catch ($ex) {
      console.error($ex);
    }
    return;
  };

  post = async (text, reply = null) => {
    if (!this.self) return null;
    try {
      const rt = new RichText({ text });
      await rt.detectFacets(this.agent);
      let params = {
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
