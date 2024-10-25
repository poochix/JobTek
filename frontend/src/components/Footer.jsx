import { Home } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Company Name</h2>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/about" className="hover:text-gray-400">About Us</a>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">Follow us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
