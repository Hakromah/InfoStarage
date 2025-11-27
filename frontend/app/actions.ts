"use server";

import { z } from "zod";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;

// Zod schema for new password entry
export const AddPasswordSchema = z.object({
   appName: z.string().min(1),
   email: z.string().email(),
   text: z.string().min(1),

});

// server action to add a password entry
export async function addPassword(formData: FormData, token?: string) {
   // formData -> extract fields
   const data = {
      appName: formData.get("appName") as string,
      email: formData.get("email") as string,
      text: formData.get("text") as string,
   };

   const parse = AddPasswordSchema.safeParse(data);
   if (!parse.success) {
      throw new Error("Validation failed: " + JSON.stringify(parse.error));
   }

   const body = {
      data: { appName: data.appName, email: data.email, text: data.text },
   };

   const res = await fetch(`${STRAPI}/api/password-entries`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
   });

   if (!res.ok) {
      const txt = await res.text();
      throw new Error("Add failed: " + txt);
   }

   const json = await res.json();
   return json;
}

// server action to search password entries by appName (simple filter)
export async function searchPasswords(query: string, token?: string) {
   // Use Strapi filters: filters[appName][$containsi]=query
   const url = `${STRAPI}/api/password-entries?filters[appName][$containsi]=${encodeURIComponent(
      query
   )}&pagination[pageSize]=50&populate=*`;

   const res = await fetch(url, {
      headers: {
         "Content-Type": "application/json",
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
   });

   if (!res.ok) {
      const txt = await res.text();
      throw new Error("Search failed: " + txt);
   }
   const json = await res.json();
   return json;
}
