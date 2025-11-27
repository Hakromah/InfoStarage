"use client";

import { useEffect, useState } from "react";
import { getPasswordEntries } from "@/data/loaders";
import type { PasswordEntry } from "@/types/password";

export default function DisplayedData() {
   const [data, setData] = useState<PasswordEntry[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function load() {
         try {
            const res = await getPasswordEntries();

            if (Array.isArray(res?.data)) {
               setData(res.data);
            }
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      }

      load();
   }, []);

   if (loading) return <p>Loading...</p>;
   if (!data.length) return <p>No records found</p>;

   return (
      <div className="flex flex-wrap gap-4 p-4 bg-gray-100">
         {data.map((item) => (
            <div key={item.id} className="grow shrink-0 basis-80 md:basis-96 lg:basis-0 min-w-80 max-w-lg bg-blue-500 text-white p-6 rounded-lg shadow-lg">
               <h3 className="text-lg font-bold">AppName:{item.appName}</h3>
               <p className="text-sm">Email: {item.email}</p>
               <p className="text-sm">Password: {item.text}</p>
            </div>
         ))}
      </div>
   );
}
