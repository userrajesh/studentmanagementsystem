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

  async addSchool({
    school_name,
    school_country,
    school_state,
    school_city,
    school_pincode,
    school_address,
    school_reg_number,
    user_id,
  }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: "school",
        rowId: ID.unique(),
        data: {
          school_name,
          school_country,
          school_state,
          school_city,
          school_pincode,
          school_address,
          school_registrationno: school_reg_number,
          user_id,
        },
      });
    } catch (error) {
      console.log("Error while addding school in addSchool::", error);
    }
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

  async getSchoolByUserId(userId) {
    try {
      const response = await this.tablesDB.listRows({
        databaseId: conf.database_Id,
        tableId: "school",
        queries: [Query.equal("user_id", userId)],
      });

      return response.rows[0]; // return first matching school
    } catch (error) {
      console.log("Error getting school:", error);
      return null;
    }
  }
}
const databseconfiguration = new DatabaseConfiguration();
export default databseconfiguration;
