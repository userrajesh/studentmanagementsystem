import conf from "../../conf/conf";
import { Client, Account, Query, TablesDB, Storage } from "appwrite";

class EditStudent {
  client = new Client();
  account;
  storage;

  constructor() {
    this.client.setProject(conf.project_Id).setEndpoint(conf.project_Url);

    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async getAllStudent({
    limit = 10,
    offset = 0,
    search,
    classFilter,
    sectionFilter,
    schoolId,
  } = {}) {
    try {
      const queries = [];

      // Filter by schoolId
      if (schoolId) {
        queries.push(Query.equal("schoolId", [schoolId]));
      }

      const safeLimit = Number(limit);
      const safeOffset = Number(offset);

      if (isNaN(safeLimit) || isNaN(safeOffset)) {
        throw new Error("Limit or Offset is not a valid number");
      }

      queries.push(Query.limit(safeLimit));
      queries.push(Query.offset(safeOffset));

      // Search student name
      if (search?.trim()) {
        queries.push(Query.search("fullName", search.trim()));
      }

      // Class filter
      if (classFilter) {
        queries.push(Query.equal("Class", [classFilter]));
      }

      // Section filter
      if (sectionFilter) {
        queries.push(Query.equal("section", [sectionFilter]));
      }

      const response = await this.tablesDB.listRows({
        databaseId: conf.database_Id,
        tableId: "student",
        queries,
      });

      return response;
    } catch (error) {
      console.log("Error in getAllStudent", error);
      return null;
    }
  }
  async getStudentByClass({studentClass, section, schoolId}) {
    
    try {
      // stop if any value is missing
      if (!studentClass || !section) {
        throw new Error("Class and Section are required");
      }

      const queries = [
        Query.equal("schoolId", [schoolId]),
        Query.equal("Class", [studentClass]),
        Query.equal("section", [section]),
      ];

      return await this.tablesDB.listRows({
        databaseId: conf.database_Id,
        tableId: "student",
        queries,
      });
    } catch (error) {
      console.log("Error in getStudentByClass::", error);
    }
  }

  async getSingleStudent(id) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.database_Id,
        tableId: "student",
        rowId: id,
      });
    } catch (error) {
      console.log("Error in getSingleStudent", error);
      return null;
    }
  }

  async getAdmissionDetails(studentId) {
    try {
      const student = await this.getSingleStudent(studentId);

      if (!student?.admissionId) return null;

      return await this.tablesDB.getRow({
        databaseId: conf.database_Id,
        tableId: "admission",
        rowId: student.admissionId,
      });
    } catch (error) {
      console.log("Error in getAdmissionDetails", error);
      return null;
    }
  }

  async getParentDetails(studentId) {
    try {
      const res = await this.tablesDB.listRows({
        databaseId: conf.database_Id,
        tableId: "parent",
        queries: [Query.equal("studentID", studentId)],
      });

      return res.rows[0] || null;
    } catch (error) {
      console.log("Error in getParentDetails", error);
      return null;
    }
  }

  async getFileDetails(studentId) {
    try {
      const res = await this.tablesDB.listRows({
        databaseId: conf.database_Id,
        tableId: "student_documents",
        queries: [Query.equal("studentId", studentId)],
      });

      return res || null;
    } catch (error) {
      console.log("Error in getting File details", error);
      return null;
    }
  }
  getStudentPicture(fileId) {
    try {
      if (!fileId) return null;

      return this.storage.getFileView(conf.bucket_Id, fileId);
    } catch (error) {
      console.log("Error getting student picture", error);
      return null;
    }
  }
}

const editStudent = new EditStudent();
export default editStudent;
