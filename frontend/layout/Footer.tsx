/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DollarSign } from "lucide-react";
import { getHomePage } from "@/data/loaders";
import { FooterSection } from "@/types/strapi";
import { useEffect, useState } from "react";

const FooterLinks = [
   {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Security'],
   },
   {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Partners'],
   },
   {
      title: 'Resources',
      links: ['Blog', 'Support', 'Legal', 'Privacy'],
   },
];

export default function Footer() {
   const [footers, setFooter] = useState<FooterSection | null>(null);

   useEffect(() => {
      async function load() {
         const data = await getHomePage();
         console.log(data);
         setFooter(data.data);
      }
      load();
   }, []);
   return (
      <footer className="bg-slate-800 text-slate-300 mt-12 border-t border-slate-700">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

               {/* Brand and Description (Col 1) */}
               <div className="col-span-2 lg:col-span-2 space-y-4">
                  <a href="#" className="flex items-center space-x-2 text-white text-2xl font-bold tracking-tight">
                     <DollarSign className="w-6 h-6 text-indigo-400" />
                     <span>FinTechApp</span>
                  </a>
                  <p className="text-sm text-slate-400 max-w-xs">
                     Simplifying financial complexity with modern, secure, and intuitive tools for everyone.
                  </p>
               </div>
               {/* Navigation Links (Col 2-4) */}
               {FooterLinks.map((section) => (
                  <div key={section.title} className="space-y-4">
                     <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                     <ul className="space-y-2">
                        {section.links.map((link) => (
                           <li key={link}>
                              <a
                                 href={`/${link.toLowerCase().replace(' ', '-')}`}
                                 className="text-sm text-slate-400 hover:text-indigo-400 transition duration-150"
                              >
                                 {link}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
            {/* Separator and Copyright */}
            <div className="mt-12 pt-8 border-t border-slate-700">
               <p className="text-center text-sm text-slate-400">
                  &copy; {new Date().getFullYear()} FinTechApp, Inc. All rights reserved.
               </p>
            </div>
         </div>
      </footer>
   );
}
