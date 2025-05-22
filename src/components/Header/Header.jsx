// src/components/Header.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Moon,
  Sun,
  Menu,
  ShoppingCart,
  Heart,
  Search,
  UserCircle,
  Bell
} from 'lucide-react';
import { Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Sell now', slug: '/add-post', active: authStatus }
  ];


  return (
    <header className="py-3 px-4 sm:px-6 md:px-8 bg-white dark:bg-slate-900 dark:text-white border-b shadow-sm w-full z-50">
      <Container>
        <nav className="flex flex-wrap items-center justify-between gap-y-2 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="36px" />
            <span className="font-bold text-lg hidden sm:inline">Ebiblos</span>
          </Link>

          

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <ul className="hidden md:flex items-center gap-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-3 py-1.5 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => navigate('/favorites')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Favorites"
                    >
                      <Heart size={18} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/notifications')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Notifications"
                    >
                      <Bell size={18} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/cart')}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                      title="Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
                      title="Profile Menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white">
                        <UserCircle size={20} />
                      </div>
                      <span className="hidden sm:inline">Account</span>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 shadow-lg rounded-md overflow-hidden z-50 w-40">
                        <button
                          onClick={() => {
                            navigate('/dashboardPage');
                            setDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          Profile
                        </button>
                        <div className="border-t dark:border-slate-700" />
                        <LogoutBtn />
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <ul className="absolute top-14 right-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 space-y-2 md:hidden z-50 w-48">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/favorites');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <Heart size={18} /> Favorites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/notifications');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <Bell size={18} /> Notifications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/cart');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <ShoppingCart size={18} /> Cart
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/dashboardPage');
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700"
                    >
                      <UserCircle size={18} /> Profile
                    </button>
                  </li>
                  <li>
                    <LogoutBtn />
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
