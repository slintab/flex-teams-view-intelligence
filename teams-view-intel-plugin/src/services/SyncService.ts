import * as Flex from "@twilio/flex-ui";
import { SyncClient } from "twilio-sync";
import axios from "axios";

const FUNCTIONS_URL = process.env.FLEX_APP_FUNCTIONS_URL;

class SyncService {
  url: string | undefined;
  manager: Flex.Manager;
  client: SyncClient | null;

  constructor() {
    this.url = FUNCTIONS_URL;
    this.manager = Flex.Manager.getInstance();
    this.client = null;
  }

  async getToken() {
    const url = this.url + "/token";
    const payload = {
      Token: this.manager.user.token,
      identity: this.manager.user.identity,
    };

    try {
      const response = await axios.post(url, payload);
      return response.data.token;
    } catch (e) {
      console.error(`Error making request: ${e}`);
    }
    return false;
  }

  async getSyncClient() {
    const token = await this.getToken();

    if (token) {
      this.client = new SyncClient(token);
    }
  }

  async getDocument(name: string) {
    if (this.client === null) {
      await this.getSyncClient();
    }

    if (!this.client) {
      return false;
    }

    return this.client.document({
      id: name,
      mode: "open_or_create",
      ttl: 86400,
    });
  }

  async getList(name: string) {
    if (this.client === null) {
      await this.getSyncClient();
    }

    if (!this.client) {
      return false;
    }

    return this.client.list({
      id: name,
      mode: "open_or_create",
      ttl: 86400,
    });
  }
}

export default new SyncService();
