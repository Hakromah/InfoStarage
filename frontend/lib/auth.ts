const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type LoginParams = {
   identifier: string;
   password: string;
};

export async function loginUser({ identifier, password }: LoginParams) {
   const res = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         identifier,
         password,
      }),
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data?.error?.message || "Login failed");
   }

   return data;
}

export function logoutUser() {
   localStorage.removeItem("strapiToken");
}

export function getToken() {
   if (typeof window === "undefined") return null;
   return localStorage.getItem("strapiToken");
}
