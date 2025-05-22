import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap -mx-6">
          {/* Logo + Info */}
          <div className="w-full lg:w-4/12 px-6 mb-10 lg:mb-0">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Herald College. All rights reserved.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full sm:w-6/12 lg:w-2/12 px-6 mb-8 lg:mb-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-400 transition-colors" to="/">Features</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/">Pricing</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/">Press Kit</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-6/12 lg:w-2/12 px-6 mb-8 lg:mb-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-400 transition-colors" to="/account">Account</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/help">Help</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/support">Customer Support</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-6/12 lg:w-2/12 px-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-400 transition-colors" to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-blue-400 transition-colors" to="/licensing">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
