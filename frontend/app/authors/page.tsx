/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthorCard } from "@/components/AuthorCard";
import { getUsers } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
   const data = await getUsers();
   if (!data) notFound();
   return data;
}

export default async function AuthorsRoute() {
   const data = await loader();
   return (
      <div className="container mx-auto py-12">
         <h1 className="text-3xl font-bold mb-8">Our Authors</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((author: any) => (
               <AuthorCard key={author.id} author={author} />
            ))}
         </div>
      </div>
   );
}
