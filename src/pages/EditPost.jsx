// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostForm, Container } from "../components";

const EditPost = () => {
  const { postId } = useParams(); // ✅ use correct param name
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!postId) return navigate("/dashboard");
  
        const postData = await appwriteService.getPost(postId);
        if (!postData) return navigate("/dashboard");
  
        // Get image previews
        const previewURLs = await appwriteService.getFilePreviews(postData.featuredImage || []);
  
        // Add previewURLs to post data
        setPost({
          ...postData,
          previewImages: previewURLs,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
  
    loadPost();
  }, [postId, navigate]);
  
  if (loading) return <div className="p-6">Loading post...</div>;

  return post ? (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <PostForm post={post} />
    </Container>
  ) : (
    <div className="p-6 text-center text-red-500">Post not found.</div>
  );
};

export default EditPost;
