import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth"; 
import service from "../appwrite/config";   
import { Query } from 'appwrite';
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updateName, setUpdateName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/login");
        } else {
          setUser(currentUser);
          setUpdateName(currentUser.name);
          setPhone(currentUser.prefs?.phone || "");
          setAddress(currentUser.prefs?.address || "");

          const postList = await service.getPosts([
            Query.equal("userId", currentUser.$id),
          ]);
          setPosts(postList.documents);
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (updateName) {
        await authService.account.updateName(updateName);
      }

      await authService.account.updatePrefs({ phone, address });

      if (newPassword.length >= 8) {
        await authService.account.updatePassword(newPassword, "");
        alert("Password updated successfully!");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const response = await fetch('/delete-account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.$id }),
        });

        if (response.ok) {
          alert("Account deleted successfully.");
          navigate("/signup");
        } else {
          alert("Error deleting account. Please try again.");
        }
      } catch (error) {
        console.error("Delete account error:", error.message);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const success = await service.deletePost(postId);
      if (success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postId));
        alert("Post deleted successfully.");
      } else {
        alert("Failed to delete the post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert("An error occurred while deleting the post.");
    }
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name} 👋</h1>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Details</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.emailVerification ? "Verified ✅" : "Not Verified ❌"}</p>
      </div>

      {/* Update Profile */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-3">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <input
          type="text"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          placeholder="New Name"
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password (min 8 chars)"
          className="border p-2 w-full rounded"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="border p-2 w-full rounded"
        />
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.$id}
                className="border-b pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                  <p className="text-sm text-gray-600">Rate: Rs. {post.rate}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/editpost/${post.$id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.$id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
