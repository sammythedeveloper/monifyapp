import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" mt-64 " >
      <div className="max-w-screen-xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ml-16 ">
        
        {/* About Section */}
        <div className="footer-section">
          <h3 className="text-xl font-semibold mb-4">About MoneyTrack</h3>
          <p className="text-gray-400">
            MoneyTrack is your personal finance companion, designed to help you manage and track your expenses, 
            monitor savings, and achieve your financial goals. With intuitive features and real-time tracking, 
            keep your financial journey organized and stress-free.
          </p>
        </div>

        {/* Features Section */}
        <div className="footer-section">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Expense Tracking</li>
            <li>Budget Management</li>
            <li>Real-time Sync</li>
            <li>Financial Goal Setting</li>
            <li>Spending Reports</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">
            Email: <a href="mailto:support@moneytrack.com" className="hover:underline">support@moneytrack.com</a>
          </p>
          <p className="text-gray-400">
            Phone: +1 123 456 7890
          </p>
        </div>
        <div className="footer-section">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 ">
        <p className=" py-24 " > &copy; {new Date().getFullYear()} MoneyTrack. All Rights Reserved.</p>
      </div>
      </footer>
  );
};

export default Footer;
