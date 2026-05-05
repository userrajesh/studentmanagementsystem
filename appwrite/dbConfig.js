import { Client, ID, TablesDB, Storage, Query } from "appwrite";
import conf from "../conf/conf";
class DatabaseConfiguration {
  client = new Client();
  account;
  storage;
  constructor() {
    this.client.setEndpoint(conf.project_Url).setProject(conf.project_Id);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async addUser({ userId, country }) {
    try {
      console.log(userId, country);
      return await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: conf.user_table_Id,
        rowId: ID.unique(),
        data: {
          userId,
          country, 
        },
      });
    } catch (error) {
      console.log("error in adding user::", error);
    }
  }
  async addStudent(
    firstName,
    lastName,
    email,
    dateofBirth,
    enrollmentYear,
    standard,
    image,
  ) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          firstName,
          lastName,
          email,
          dateofBirth,
          enrollmentYear,
          standard,
          image,
        },
      });
    } catch (error) {
      console.log("Appwrite:Add Student method error:", error);
    }
  }
  async getAllStudent() {
    try {
      const data = await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(":error in getallStudent", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("upload file error :", error);
    }
  }

  getfilePreview(fileId) {
    try {
      const filePath = this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });

      return filePath;
    } catch (error) {
      console.log("error in getfilepreview", error);
      return false;
    }
  }
}
const databseconfiguration = new DatabaseConfiguration();
export default databseconfiguration;
