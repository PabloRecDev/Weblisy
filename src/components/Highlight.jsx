import React from 'react';

export default function Highlight({ children }) {
  return (
    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
      {children}
    </span>
  );
} 