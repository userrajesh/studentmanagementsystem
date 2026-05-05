const appwriteConfigData = {
  project_Url: String(import.meta.env.VITE_APPWRITE_PROJECT_URL),
  project_Id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  database_Id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  table_Id: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  user_table_Id:String(import.meta.env.VITE_APPWRITE_USER_TABLE_ID),
  bucket_Id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default appwriteConfigData;