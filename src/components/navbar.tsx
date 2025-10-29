import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`fixed top-4 left-4 z-50 ${className || ''}`}>
      <Link to="/">
        <img src="/btsolutions.png" className="h-16" alt="Better Teaching Solutions" />
      </Link>
    </div>
  );
};

export default Navbar; 