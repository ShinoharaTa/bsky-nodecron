import pkg from "@atproto/api";
const { BskyAgent } = pkg;

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

  post = async (message) => {
    if (!this.self) return;
    try {
      await this.agent.api.app.bsky.feed.post.create(
        { repo: this.self.did },
        {
          text: message,
          createdAt: new Date().toISOString(),
        }
      );
    } catch ($ex) {
      console.error($ex);
    }
    return;
  };
}
