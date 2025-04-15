import React from "react";

const Footer = () => {
  return (
    <footer className='border-t max-h-60 bg-blue-500 text-xl text-white p-10 flex justify-center items-center'>
      <span>Copyright © {new Date().getFullYear()} DeFiDev-sys</span>
    </footer>
  );
};

export default Footer;
