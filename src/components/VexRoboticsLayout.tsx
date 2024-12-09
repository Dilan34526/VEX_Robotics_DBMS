import React,{ useState, useEffect, ReactNode } from 'react';

export const VexRoboticsLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center">
          <h1 className="text-xl font-bold text-gray-800">VEX Robotics DBMS</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-8 px-4 pb-20">
        {children}
      </main>
    </div>
  );
};