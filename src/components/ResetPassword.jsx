import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../appwrite/auth"; // adjust import if needed

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const handleReset = async () => {
    try {
      await authService.updatePasswordRecovery(userId, secret, newPassword);
      setStatus("✅ Password reset successful!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to reset password.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default ResetPassword;
