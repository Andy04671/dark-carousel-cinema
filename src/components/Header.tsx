
import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            NETSTREAM
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/series" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            <a href="#movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </a>
            <a href="#mylist" className="text-white hover:text-gray-300 transition-colors">
              My List
            </a>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                className="absolute right-0 top-full mt-2 w-80 bg-black/90 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                autoFocus
              />
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell size={20} />
          </button>

          {/* Profile */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
