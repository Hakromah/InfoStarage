"use client";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
   isLoggedIn: boolean;
   setIsLoggedIn: (v: boolean) => void;
   showLogin: boolean;
   setShowLogin: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showLogin, setShowLogin] = useState(false);

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, showLogin, setShowLogin }}>
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => useContext(AuthContext)!;
