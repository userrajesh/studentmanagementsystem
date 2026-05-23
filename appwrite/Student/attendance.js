import conf from "../../conf/conf";
import { Client, Account, Query, TablesDB, Storage, ID } from "appwrite";

class Attendance {
  client = new Client();
  account;
  storage;

  constructor() {
    this.client.setProject(conf.project_Id).setEndpoint(conf.project_Url);

    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async mark_attandance(
    studentSession,
    date,
    studentClass,
    section,
    attendance,
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
        ],
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
          },
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
          },
        );

        console.log("Attendance Inserted");
      }
    } catch (error) {
      console.log("Attendance Error:", error);
    }
  }

  async getAttendance(studentSession, date, studentClass, section) {
    try {
      return await this.tablesDB.listRows(
        conf.database_Id,
        "studentattendance",
        [
          Query.equal("Year", studentSession),
          Query.equal("Date", date),
          Query.equal("schoolClass", studentClass),
          Query.equal("schoolSection", section),
        ],
      );
    } catch (error) {
      console.log("Error in getting attendance", error);
    }
  }

 async getMonthlyAttendance(studentSession, studentClass, section, month) {
  try {
    // month format => "2026-05"

    const [year, monthNumber] = month.split("-");

    // START DATE
    const startDate = `${year}-${monthNumber}-01`;

    // LAST DAY OF MONTH
    const lastDay = new Date(year, monthNumber, 0).getDate();

    // END DATE
    const endDate = `${year}-${monthNumber}-${String(lastDay).padStart(
      2,
      "0"
    )}`;

    console.log(startDate);
    console.log(endDate);

    return await this.tablesDB.listRows(
      conf.database_Id,
      "studentattendance",
      [
        Query.equal("Year", studentSession),

        Query.equal("schoolClass", studentClass),

        Query.equal("schoolSection", section),

        Query.greaterThanEqual("Date", startDate),

        Query.lessThanEqual("Date", endDate),
      ],
    );
  } catch (error) {
    console.log("Error in getting monthly attendance", error);
  }
}
}

const studentAttendance = new Attendance();

export default studentAttendance;
