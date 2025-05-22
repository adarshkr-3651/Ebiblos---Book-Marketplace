import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";
import { Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // Create a new post with multiple images
    async createPost({
        title,
        slug,
        content,
        featuredImage = [],
        status,
        userId,
        postedBy, // <-- add this
        rate,
        dateAD,
        dateBS,
        phoneNo,
        location,
        category,
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    postedBy, // <-- include it here too
                    rate,
                    dateAD,
                    dateBS,
                    phoneNo,
                    location,
                    category,
                }
            );
        } catch (error) {
            console.error("Appwrite service error: createPost", error);
            throw error;
        }
    }
    

    // Update post with multiple images
    async updatePost(postId, {
        title,
        slug,
        content,
        featuredImage = [],
        status,
        userId,
        postedBy, // <-- add here
        rate,
        dateAD,
        dateBS,
        phoneNo,
        location,
        category,
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    postedBy, // <-- and include here
                    rate,
                    dateAD,
                    dateBS,
                    phoneNo,
                    location,
                    category,
                }
            );
        } catch (error) {
            console.error("Appwrite service error: updatePost", error);
            throw error;
        }
    }
    

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service error: deletePost", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.error("Appwrite service error: getPost", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service error: getPosts", error);
        }
    }

    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return result.$id;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Failed to upload file.");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service error: deleteFile", error);
            return false;
        }
    }

    // Get view URLs for an array of fileIds
    async getFilePreviews(fileIds) {
        try {
            console.log("File IDs:", fileIds); // Debugging line
            if (!Array.isArray(fileIds)) return [];

            const previews = fileIds.map((fileId) => {
                return this.bucket.getFileView(conf.appwriteBucketId, fileId);
            });

            return previews; // array of preview URLs (promises are not awaited because getFileView is synchronous)
        } catch (error) {
            console.error("Appwrite service error: getFilePreviews", error);
            return [];
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service error: getCurrentUser", error);
            return null;
        }
    }


    async createBid(postId, buyerId, sellerId, bidAmount) {
        try {
          return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteBidsCollectionId,
            ID.unique(),
            {
              postId,
              buyerId,
              sellerId,
              bidAmount,
              accepted: false,
            },
            [
              Permission.read(Role.user(buyerId)),
              Permission.write(Role.user(sellerId)),
              Permission.update(Role.user(sellerId)),
              Permission.create(Role.user(buyerId))
            ]
          );
        } catch (error) {
          console.log("Appwrite service error: createBid", error);
          throw error;
        }
      }
      
    
    

    
    async handleBidSubmit(){
        try {
          const result = await appwriteService.createBid({
            postId: post.$id,
            buyerId: currentUser.$id,
            sellerId: post.userId,
            amount: bidAmount,
          });
      
          console.log("Bid created:", result);
        } catch (err) {
          console.error("Bid error:", err);
        }
      };

    async updateBidStatus(bidId, status) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBidsCollectionId,
                bidId,
                { status }
            );
        } catch (error) {
            console.error("updateBidStatus error", error);
            throw error;
        }
    }

    // ----- Notifications -----
    async sendNotification({ userId, message, link = "", type = "info", read = false }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNotificationsCollectionId,
                ID.unique(),
                {
                    userId,
                    message,
                    link,
                    type,
                    read,
                }
            );
        } catch (error) {
            console.error("sendNotification error", error);
            throw error;
        }
    }

    async markNotificationsRead(userId) {
        const res = await databases.listDocuments(DB_ID, NOTIFICATIONS_COLLECTION, [
          Query.equal('userId', userId),
          Query.equal('read', false),
        ]);
        for (const doc of res.documents) {
          await databases.updateDocument(DB_ID, NOTIFICATIONS_COLLECTION, doc.$id, {
            read: true,
          });
        }
    }
      

    async getNotifications(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNotificationsCollectionId,
                [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
            );
        } catch (error) {
            console.error("getNotifications error", error);
            return [];
        }
    }
}

const service = new Service();
export default service;
