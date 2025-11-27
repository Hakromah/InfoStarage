"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { fetchAPI } from "@/utils/fetch-api";

interface Props {
   onClose: () => void;
   onLoginSuccess?: () => void;
}

export default function LoginModal({ onClose, onLoginSuccess }: Props) {
   const [identifier, setIdentifier] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   async function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setError(null);


      try {
         const url = `${getStrapiURL()}/api/auth/local`;
         const res = await fetchAPI(url, {
            method: "POST",
            body: { identifier, password },
         });

         // fetchAPI returns JSON or a status object
         if (!res || (res as { status?: number }).status) {
            throw new Error("Login failed");
         }

         // Strapi returns { jwt, user }
         const maybeJwt = (res as unknown) as { jwt?: string };
         if (!maybeJwt || typeof maybeJwt.jwt !== "string") {
            throw new Error("No token returned");
         }

         localStorage.setItem("strapiToken", maybeJwt.jwt);
         onLoginSuccess?.();
         onClose();
      } catch (err: unknown) {
         if (err instanceof Error) setError(err.message);
         else setError("Unexpected error");
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="
         fixed inset-0 z-50 flex items-center justify-center
         bg-linear-to-br from-black/60 via-black/40 to-black/60
         backdrop-blur-md
         animate-fade-in
  ">
         <div className="
      relative w-full max-w-md
      bg-white/90 backdrop-blur-xl
      border border-white/30
      rounded-3xl
      p-8
      shadow-2xl shadow-black/40
      animate-scale-in
    ">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-bold text-gray-800">Welcome back</h3>
               <button
                  onClick={onClose}
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-800 text-xl transition"
                  type="button"
               >
                  ✕
               </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
               <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or username"
                  className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  type="text"
               />

               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  type="password"
               />

               {error && (
                  <div className="text-sm text-red-500 bg-red-100/60 rounded-lg px-3 py-2">
                     {error}
                  </div>
               )}

               <div className="flex justify-end gap-3 pt-3">
                  <Button
                     type="button"
                     onClick={onClose}
                     className="rounded-full px-5"
                  >
                     Cancel
                  </Button>

                  <Button
                     type="submit"
                     className="rounded-full px-6 bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:scale-105 transition"
                  >
                     {loading ? "Logging in..." : "Login"}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}
