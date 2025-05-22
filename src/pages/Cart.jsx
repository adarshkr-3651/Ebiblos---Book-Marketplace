import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart IDs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  // Fetch post details
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const allPosts = (await appwriteService.getPosts())?.documents || [];
        const cartPosts = allPosts.filter((p) => cart.includes(p.$id));
        setPosts(cartPosts);
      } catch (err) {
        console.error('Failed to fetch cart items:', err);
      } finally {
        setLoading(false);
      }
    };
    if (cart.length) fetchCartItems();
    else setLoading(false);
  }, [cart]);

  const removeFromCart = (id) => {
    const updated = cart.filter((cid) => cid !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const total = posts.reduce((sum, p) => sum + parseFloat(p.rate || 0), 0);

    return (
      <Container>
        <h1 className="text-2xl font-semibold my-6">Your Cart</h1>
        {loading ? (
          <p className="text-center">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
                    onClick={() => removeFromCart(post.$id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                    title="Remove from cart"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-medium">Total: Rs. {total.toFixed(2)}</span>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </Container>
    );
  }