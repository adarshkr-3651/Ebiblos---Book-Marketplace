import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import { Container } from '../components';

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [biddingStatus, setBiddingStatus] = useState('');
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResp, userResp] = await Promise.all([
          appwriteService.getPost(slug),
          appwriteService.getCurrentUser()
        ]);

        if (postResp) {
          setPost(postResp);
          checkLocalStorage(postResp.$id);

          if (Array.isArray(postResp.featuredImage) && postResp.featuredImage.length > 0) {
            const urls = await appwriteService.getFilePreviews(postResp.featuredImage);
            setImageUrls(urls.map(img => typeof img === 'string' ? img : img?.href));
          }
        } else {
          setError('Post not found');
        }

        if (userResp) {
          setUser(userResp);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Something went wrong.');
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  const checkLocalStorage = (id) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setInCart(cart.some((item) => item.id === id));
      setIsFavorite(favorites.some((item) => item.id === id));
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  };

  const handleBidSubmit = async () => {
    if (!user || !post) return;
  
    const buyerId = user.$id;
    const sellerId = post.userId;
    const postId = post.$id;
  
    try {
      await appwriteService.createBid(postId, buyerId, sellerId, bidAmount);
  
      await appwriteService.sendNotification({
        userId: sellerId,
        message: `You received a new bid of Rs ${bidAmount} for your product "${post.title}"`,
        link: `/dashboard/posts/${postId}`,
        type: 'bid',
      });
  
      setBiddingStatus('Bid submitted successfully!');
      setBidAmount('');
    } catch (err) {
      console.error('Bid error:', err);
      setBiddingStatus('Failed to submit bid');
    }
  };
  

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (inCart) {
      const updatedCart = cart.filter((item) => item.id !== post.$id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setInCart(false);
    } else {
      cart.push({ id: post.$id, title: post.title });
      localStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.id !== post.$id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push({ id: post.$id, title: post.title });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (error) {
    return <div className="text-center mt-10 text-red-500 font-semibold">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-10 text-lg text-gray-500">Loading post...</div>;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto bg-white rounded shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content: Text & Image */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
              <p className="text-gray-500 mb-1">Category: <span className="font-medium">{post.category}</span></p>
              <p className="text-gray-500 mb-1">Location: <span className="font-medium">{post.location}</span></p>
              <p className="text-gray-700 mb-4">Rate: <span className="font-semibold">Rs {post.rate}</span></p>

              <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden mb-4">
                {imageUrls.length > 0 ? (
                  imageUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`preview-${idx}`}
                      className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">No images available</div>
                )}
              </div>

              <div className="text-gray-700 mt-4 text-md leading-relaxed">{parse(post.content || '')}</div>
            </div>

            {/* Right Panel: Actions */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
  <button
    onClick={toggleCart}
    className={`w-full px-4 py-2 text-sm rounded font-semibold transition ${
      inCart ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'
    }`}
  >
    {inCart ? 'Remove from Cart' : 'Add to Cart'}
  </button>

  <button
    onClick={toggleFavorite}
    className={`w-full px-4 py-2 text-sm rounded font-semibold transition ${
      isFavorite ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-gray-300 text-black hover:bg-gray-400'
    }`}
  >
    {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
  </button>

  <button
    onClick={() => window.location.href = `/checkout}`}
    className="w-full px-4 py-2 text-sm rounded font-semibold transition bg-purple-600 text-white hover:bg-purple-700"
  >
    Buy Now
  </button>
</div>


              {/* Bid Box */}
              {user && user.$id !== post.userId && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">Make a Bid</h3>
                  <input
                    type="number"
                    placeholder="Bid amount (Rs)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <button
                    onClick={handleBidSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
                  >
                    Submit Bid
                  </button>
                  {biddingStatus && <p className="mt-2 text-sm text-gray-600">{biddingStatus}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;
