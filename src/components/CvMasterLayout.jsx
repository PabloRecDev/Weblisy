import React from 'react';
import Sidebar from './Sidebar';

export default function CvMasterLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto ml-64">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 