import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppChatButton from '../ui/WhatsAppChatButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
};

export default Layout; 