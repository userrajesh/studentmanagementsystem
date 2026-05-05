import conf from "../conf/conf";
import databseconfiguration from "./dbConfig";

import { Client, Account, ID } from "appwrite";

class AuthenticateUser {
  client = new Client();
  account;

  constructor() {
    this.client.setProject(conf.project_Id).setEndpoint(conf.project_Url);
    this.account = new Account(this.client);
  }
  //Create User
  async createUser({ userId = ID.unique(), email, name, password, country }) {
    try {
      country = country;
      const user = await this.account.create({
        userId: userId,
        email: email,
        name: name,
        password: password,
      });

      if (user) {
        await databseconfiguration.addUser({
          userId: user.$id,
          country,
        });
         
        this.login(this.email,this.password);
        // agar user register ho gaya to usko login page pe le jaate hai
        return user;
      }
    } catch (error) {
      console.log("Error inside Create user::", error);
    }
  }

  async login( {email, password} ) {
    try {
      console.log("inside login", email,password)
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log("Error inside Login ::", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error inside logout ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("get current user::", error);
    }
  }
}
const userAuth = new AuthenticateUser();
export default userAuth;
