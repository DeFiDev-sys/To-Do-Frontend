import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
     {
       hostname:'res.cloudinary.com',
       protocol:'https'
     }
    ] 
     },
     experimental: {
       serverActions: {
         bodySizeLimit: "10mb",
       },
     },
};

export default nextConfig;
