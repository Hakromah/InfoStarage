"use client";

import { useEffect, useState, useCallback } from "react";
import { getPasswordEntries } from "@/data/loaders";
import type { PasswordEntry } from "@/types/password";

import AddUserForm from "./AddUserForm";
import Search from "./Search";

export default function PasswordPage() {
   const [data, setData] = useState<PasswordEntry[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchData = useCallback(async () => {
      setLoading(true);
      try {
         const res = await getPasswordEntries();
         if (Array.isArray(res?.data)) {
            setData(res.data);
         }
      } catch (e) {
         console.error(e);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   return (
      <div>
         <AddUserForm onSuccess={fetchData} />
         <Search data={data} loading={loading} />
      </div>
   );
}
