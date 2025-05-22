import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password }); // Auto-login
            }
            throw new Error("Account creation failed");
        } catch (e) {
            console.error("Create Account Error:", e.message);
            throw e;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (e) {
            console.error("Login Error:", e.message);
            throw e;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Get Current User Error:", error.message);
            return null;
        }
    }

    async sendVerification() {
        try {
            return await this.account.createVerification("http://localhost:5173/verify-email");
        } catch (error) {
            console.error("Send Verification Error:", error.message);
            throw error;
        }
    }

    async sendPasswordRecovery(email) {
        try {
            return await this.account.createRecovery(
                email,
                `${window.location.origin}/reset-password`
            );
        } catch (error) {
            console.error("Password Recovery Error:", error.message);
            throw error;
        }
    }

    async updatePasswordRecovery(userId, secret, newPassword) {
        try {
            return await this.account.updateRecovery(userId, secret, newPassword, newPassword);
        } catch (error) {
            console.error("Password Reset Error:", error.message);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Logout Error:", error.message);
            return false;
        }
    }

    async loginWithGoogle() {
        try {
            return this.account.createOAuth2Session(
                "google",
                `${window.location.origin}/auth/success`,
                `${window.location.origin}/auth/failure`
            );
        } catch (error) {
            console.error("Google Login Error:", error.message);
            throw error;
        }
    }

    async loginWithApple() {
        try {
            return this.account.createOAuth2Session(
                "apple",
                `${window.location.origin}/auth/success`,
                `${window.location.origin}/auth/failure`
            );
        } catch (error) {
            console.error("Apple Login Error:", error.message);
            throw error;
        }
    }

    async deleteAccount(userId) {
        try {
            await this.account.delete(userId);
            return true;
        } catch (error) {
            console.error("Delete Account Error:", error.message);
            return false;
        }
    }
    async updateAccount({ name, phone, address }) {
        try {
            await this.account.updateName(name);
            await this.account.updatePrefs({ phone, address });
            return true;
        } catch (error) {
            console.error("Update Account Error:", error.message);
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;
