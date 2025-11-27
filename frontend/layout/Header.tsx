"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from "@/components/LoginModal";
import { useAuth } from '@/components/AuthContext';

// --- Icon Definitions (Replacing Lucide Icons for single-file compatibility) ---
const Menu = (props: { className?: string }) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
   </svg>
);
const X = (props: { className?: string }) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
   </svg>
);


const NavLinks = [
   { name: 'Features', href: '/features' },
   { name: 'Pricing', href: '/pricing' },
   { name: 'About Us', href: '/about' },
   { name: 'Contact', href: '/contact' },
];

export const Header = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [showLogin] = useState(false);
   const { setShowLogin } = useAuth();

   return (
      <header className="bg-slate-900 shadow-xl sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo/Brand */}
               <div className="shrink-0">
                  <Link href="/" className="flex items-center space-x-2 text-white text-2xl font-bold tracking-tight rounded-lg p-1 transition duration-200">
                     <span>LOGO</span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex md:space-x-4">
                  {NavLinks.map((link) => (
                     <a
                        key={link.name}
                        href={link.href}
                        className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-150"
                     >
                        {link.name}
                     </a>
                  ))}
               </nav>

               {/* CTA Button (Desktop) */}
               <div className="hidden md:block">
                  <Button onClick={() => setShowLogin(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 transform hover:scale-[1.02]">

                     Login
                  </Button>
                  {showLogin && (
                     <LoginModal
                        onClose={() => setShowLogin(false)}
                        onLoginSuccess={() => window.location.reload()}
                     />
                  )}
               </div>

               {/* Mobile Menu Button */}
               <div className="md:hidden">
                  <Button
                     onClick={() => setIsOpen(!isOpen)}
                     className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-150"
                     aria-expanded={isOpen}
                  >
                     <span className="sr-only">Open main menu</span>
                     {isOpen ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                     ) : (
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                     )}
                  </Button>
               </div>
            </div>
         </div>

         {/* Mobile Menu Panel */}
         {isOpen && (
            <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {NavLinks.map((link) => (
                     <a
                        key={link.name}
                        href={link.href}
                        className="hidden md:block text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg text-base font-medium transition duration-150"
                     >
                        {link.name}
                     </a>
                  ))}
                  <Button className="hidden md:block w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-base font-medium transition duration-150 shadow-md">
                     Save Your Data
                  </Button>
               </div>
            </div>
         )}
      </header>
   );
}
