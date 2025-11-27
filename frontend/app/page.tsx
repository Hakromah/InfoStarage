/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddUserForm from "@/components/AddUserForm";
import { useAuth } from "@/components/AuthContext";
import HeroSections from "@/components/HeroSections";
import LoginModal from "@/components/LoginModal";
import Search from "@/components/Search";
import { getHomePage } from "@/data/loaders";
import { FooterSection, HeroSection, HomePageData } from "@/types/strapi";
import { useEffect, useState } from "react";


export default function Page() {
  const [home, setHome] = useState<HomePageData | null>(null);
  const { isLoggedIn, setIsLoggedIn, showLogin, setShowLogin } = useAuth();
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getHomePage();
      console.log(data);
      setHome(data.data);
    }
    load();
  }, []);

  if (!home) {
    return <div>Loading...</div>;
  }
  const blocks = (home as any)?.blocks || [];

  if (!Array.isArray(blocks)) {
    return <div className="p-12 text-red-500">Invalid page format: blocks are not an array.</div>;
  }

  const hero = blocks.find((b) =>
    b.__component.includes("hero")
  ) as HeroSection | undefined;

  const footer = blocks.find((b) =>
    b.__component.includes("footer")
  ) as FooterSection | undefined;

  console.log({ footer });

  async function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <main className="space-y-12 w-full h-full">
      {/* HERO */}
      {showHero && (
        <section className="relative w-full min-h-[calc(100vh-361px)] flex items-center justify-center overflow-hidden">

          <div className="absolute inset-0 w-full h-full z-0">
            <HeroSections />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
          </div>

          {hero && (
            <div className="
        relative z-10
        flex flex-col items-center gap-6
        bg-white backdrop-blur-xl
        border border-white/20
        rounded-3xl
        px-10 py-12
        w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%]
        shadow-2xl shadow-black/10
        text-center
      ">
              <h1 className="hidden md:block text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {hero.heading}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {hero.subHeading}
              </p>

              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowHero(false);
                }}
                className="
            mt-4 px-8 py-3 rounded-full
            bg-linear-to-r from-indigo-500 to-purple-500
            text-white font-semibold
            hover:scale-105 hover:shadow-lg
            transition-all duration-300
          "
              >
                Get Started
              </button>
            </div>
          )}

        </section>
      )}


      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess} />

      )}

      {/* LOGGED-IN CONTENT */}
      {isLoggedIn && (
        <section className="grid gap-4 p-8">
          <AddUserForm
            onSuccess={handleLoginSuccess} />

          <Search />
          {/* <div className="grid gap-4">
            <DisplayedData />
          </div> */}
        </section>
      )}
    </main>
  );
}



