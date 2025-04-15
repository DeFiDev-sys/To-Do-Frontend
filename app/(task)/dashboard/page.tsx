import Dashboard from "@/Screens/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = () => {
  return (
    <main>
      <Dashboard />
    </main>
  );
};

export default page;
