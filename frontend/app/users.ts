"use server";

export async function addUser(formData: FormData) {
   const username = formData.get("username") as string;
   const password = formData.get("password") as string;

   if (!username || !password) {
      throw new Error("Missing fields");
   }

   // Example API call
   const res = await fetch("http://127.0.0.1:1337/api/users", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         username,
         password
      })
   });

   return res.json();
}
