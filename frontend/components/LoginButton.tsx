"use client";

import { useState } from "react";
import { loginUser } from "@/lib/auth";

type Props = {
   onClose: () => void;
   onLoginSuccess: () => void;
};

export default function LoginModal({ onClose, onLoginSuccess }: Props) {
   const [identifier, setIdentifier] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
         const res = await loginUser({ identifier, password });
         localStorage.setItem("strapiToken", res.jwt);
         onLoginSuccess();
         onClose();
      } catch (err: unknown) {
         const message =
            err instanceof Error ? err.message : "Login failed";
         setError(message);
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
         <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold">Login</h2>
               <button onClick={onClose} className="text-gray-500">
                  ✕
               </button>
            </div>

            {error && (
               <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
               <input
                  type="text"
                  placeholder="Email or Username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full p-3 border rounded focus:outline-none focus:ring"
                  required
               />

               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded focus:outline-none focus:ring"
                  required
               />

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
               >
                  {loading ? "Logging in..." : "Login"}
               </button>
            </form>
         </div>
      </div>
   );
}


// "use client";

// type Props = {
//    onLogin: () => void;
// };

// export default function LoginButton({ onLogin }: Props) {
//    return (
//       <button
//          onClick={onLogin}
//          className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//       >
//          Login
//       </button>
//    );
// }
