import { Client, Account } from "appwrite";
import conf from "../conf/conf";

class ResetPasswordEmail {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.project_Url)
      .setProject(conf.project_Id);

    this.account = new Account(this.client);
  }

  async sendRecoveryEmail(email) {
    try {
      const response = await this.account.createRecovery(
        email,
        "https://rajeshmandal.netlify.app/reset-password"
      );

      console.log(response);
    } catch (error) {
      console.log("Recovery Error:", error);
    }
  }

  async updatePasswordRecovery(userId, secret, password) {
    console.log("Account",this.account);
    try {
      const response = await this.account.updateRecovery(
        userId,
        secret,
        password
      );

      console.log(response);
    } catch (error) {
      console.log("Password Reset Error:", error);
    }
  }
}

export default new ResetPasswordEmail();