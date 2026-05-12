import conf from "../../conf/conf";
import {
  Client,
  Account,
  Query,
  TablesDB,
  Storage,
  ID,
} from "appwrite";

class Attendance {
  client = new Client();
  account;
  storage;

  constructor() {
    this.client
      .setProject(conf.project_Id)
      .setEndpoint(conf.project_Url);

    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async mark_attandance(
    studentSession,
    date,
    studentClass,
    section,
    attendance
  ) {
    try {
      // CHECK IF RECORD ALREADY EXISTS
      const existingAttendance = await this.tablesDB.listRows(
        conf.database_Id,
        "studentattendance",
        [
          Query.equal("Year", studentSession),
          Query.equal("Date", date),
          Query.equal("schoolClass", studentClass),
          Query.equal("schoolSection", section),
        ]
      );

      // IF RECORD EXISTS -> UPDATE
      if (existingAttendance.rows.length > 0) {
        const rowId = existingAttendance.rows[0].$id;

        await this.tablesDB.updateRow(
          conf.database_Id,
          "studentattendance",
          rowId,
          {
            Attendance: attendance,
          }
        );

        console.log("Attendance Updated");
      }

      // IF RECORD DOES NOT EXIST -> INSERT
      else {
        await this.tablesDB.createRow(
          conf.database_Id,
          "studentattendance",
          ID.unique(),
          {
            Year: studentSession,
            Date: date,
            schoolClass: studentClass,
            schoolSection: section,
            Attendance: attendance,
          }
        );

        console.log("Attendance Inserted");
      }
    } catch (error) {
      console.log("Attendance Error:", error);
    }
  }
}

const studentAttendance = new Attendance();

export default studentAttendance;