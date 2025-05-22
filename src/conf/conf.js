const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteBidsCollectionId: String(import.meta.env.VITE_APPWRITE_BIDS_COLLECTION_ID),
    appwriteNotificationsCollectionId: String(import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID),
    // Add this line for bids
  }
  
  export default conf;
  