import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaCartPlus, FaShoppingCart } from 'react-icons/fa';

function PostCard({ $id, title = "Untitled Post", featuredImage = [], rate, dateAD }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await appwriteService.getFilePreviews(featuredImage);
        const urls = result.map(img => (typeof img === 'string' ? img : img?.href));
        setImageUrls(urls);
      } catch (error) {
        console.error("Failed to fetch image previews:", error);
        setImageUrls(["/path/to/default-placeholder-image.jpg"]);
      }
    };

    if (Array.isArray(featuredImage) && featuredImage.length > 0) {
      fetchImages();
    } else {
      setImageUrls(["/path/to/default-placeholder-image.jpg"]);
    }
  }, [featuredImage]);

  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setInCart(cart.includes($id));
    setIsFavorite(favorites.includes($id));
  }, [$id]);

  const toggleCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.includes($id)) {
      const updated = cart.filter(id => id !== $id);
      localStorage.setItem('cart', JSON.stringify(updated));
      setInCart(false);
    } else {
      cart.push($id);
      localStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
    }
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes($id)) {
      const updated = favorites.filter(id => id !== $id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push($id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <Link to={`/post/${$id}`} className="relative group">
      <div className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        {/* Image Slideshow */}
        <div className="w-full mb-3 rounded-lg overflow-hidden relative h-56">
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${title} ${idx}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
          ))}

          {/* Floating Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 z-20">
            <button
              onClick={toggleFavorite}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
            </button>

            <button
              onClick={toggleCart}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
              title={inCart ? "Remove from Cart" : "Add to Cart"}
            >
              {inCart ? <FaShoppingCart className="text-green-600" /> : <FaCartPlus className="text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Text Info */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        {rate && (
          <p className="text-sm text-gray-600 mt-1">
            Rate: <span className="font-medium">Rs. {parseFloat(rate).toFixed(2)}</span>
          </p>
        )}
        {dateAD && (
          <p className="text-xs text-gray-500 mt-1">Valid Till: {dateAD}</p>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
