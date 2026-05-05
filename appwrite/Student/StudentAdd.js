import { Client, Account, ID, TablesDB, Storage } from "appwrite";
import conf from "../../conf/conf";
class Student {
  client = new Client();
  account;
  storage;

  constructor() {
    this.client.setProject(conf.project_Id).setEndpoint(conf.project_Url);
    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }
  async addStudentDetails(data) {
    try {
      const admission = await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: "admission",
        rowId: ID.unique(),
        data: {
          admissionNo: data.admissionNumber,
          rollNo: data.rollNumber,
          admissionDate: data.admissionDate,
          class: data.studentclass,
          section: data.section,
          biometricID: data.biometricId,
        },
      });

      const admissionId = admission.$id;

      const student = await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: "student",
        rowId: ID.unique(),
        data: {
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          Class: data.studentclass,
          gender: data.gender,
          category: data.category,
          address: data.address,
          studentPhone: data.studentPhone,
          studentEmail: data.studentEmail,
          bloodGroup: data.bloodGroup,
          studentPhoto: data.image,
          religion: data.religion,
          studentHeight: data.studentHeight,
          studentWeight: data.studentWeight,
          studentMedicalHistory: data.medicalHistory,
          admissionId: admissionId,
        },
      });

      const studentId = student.$id;

      await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: "parent",
        rowId: ID.unique(),
        data: {
          fatherName: data.parentName,
          fatherOccupation: data.fatherOccupation,
          motherName: data.motherName,
          fatherPhno: data.fatherPhone,
          motherOccupation: data.motherOccupation,
          motherPhone: data.motherPhone,
          parentEmail: data.parentEmail,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifsc: data.ifscCode,
          studentID: studentId,
        },
      });

      // ✅ RETURN studentId
      return { studentId };
    } catch (error) {
      console.log("Error adding student", error);
      throw error;
    }
  }
  // image uploading of student
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.bucket_Id,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("upload file error :", error);
    }
  }
  //file uploading of student in seperate table
  async addStudentDocument({ studentId, name, fileId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.database_Id,
        tableId: "student_documents",
        rowId: ID.unique(),
        data: {
          studentId: studentId, // ✅ correct
          fileName: name,
          fileId: fileId,
        },
      });
    } catch (error) {
      console.log("error in uploading document ::", error);
    }
  }
}
const student = new Student();
export default student;
