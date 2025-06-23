import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);

  return (
    <>
      <header className="sticky top-0 z-50">
        <AnimatePresence>
          {isSubNavVisible && <SubNavbar setIsVisible={setIsSubNavVisible} />}
        </AnimatePresence>
        <Navbar />
      </header>
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout; 