// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container } from '../components';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = (await appwriteService.getPosts())?.documents || [];
        const cartPosts = allPosts.filter((p) => cart.includes(p.$id));
        setPosts(cartPosts);
        const sum = cartPosts.reduce((acc, post) => acc + parseFloat(post.rate || 0), 0);
        setTotal(sum);
      } catch (err) {
        console.error('Failed to load checkout posts:', err);
      }
    };
    if (cart.length > 0) fetchPosts();
  }, [cart]);

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    window.location.href = '/'; // Redirect to homepage or orders page
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold my-6">Checkout</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <ul className="divide-y">
              {posts.map((post) => (
                <li key={post.$id} className="py-2 flex justify-between">
                  <span>{post.title}</span>
                  <span>Rs {parseFloat(post.rate).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right text-lg font-semibold">
              Total: Rs {total.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </>
      )}
    </Container>
  );
}
