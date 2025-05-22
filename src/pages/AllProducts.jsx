import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 min-h-[80vh] bg-gray-100">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          All Available Items
        </h1>
        {posts.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                rate={post.rate}
                dateAD={post.dateAD}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
