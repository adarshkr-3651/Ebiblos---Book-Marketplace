import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorite IDs from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  // Fetch post details
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const allPosts = (await appwriteService.getPosts())?.documents || [];
        const favPosts = allPosts.filter((p) => favorites.includes(p.$id));
        setPosts(favPosts);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    if (favorites.length) fetchFavorites();
    else setLoading(false);
  }, [favorites]);

  const removeFavorite = (id) => {
    const updated = favorites.filter((fid) => fid !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold my-6">Your Favorites</h1>
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {posts.map((post) => (
            <div key={post.$id} className="relative">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                rate={post.rate}
                dateAD={post.dateAD}
              />
              <button
                onClick={() => removeFavorite(post.$id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                title="Remove from favorites"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
