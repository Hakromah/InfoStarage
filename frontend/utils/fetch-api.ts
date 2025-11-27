type NextFetchRequestConfig = {
   revalidate?: number | false;
   tags?: string[];
};

interface FetchAPIOptions {
   method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
   authToken?: string;
   body?: Record<string, unknown>;
   next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
   const { method, authToken, body, next } = options;

   const headers: RequestInit & { next?: NextFetchRequestConfig } = {
      method,
      headers: {
         "Content-Type": "application/json",
         ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(next && { next }),
   };

   try {
      const response = await fetch(url, headers);
      const contentType = response.headers.get("content-type");
      if (
         contentType &&
         contentType.includes("application/json") &&
         response.ok
      ) {
         return await response.json();
      } else {
         console.error("Error fetching from Strapi:", response.status, response.statusText);
         return { status: response.status, statusText: response.statusText };
      }
   } catch (error) {
      console.error(`Error ${method} data:`, error);
      throw error;
   }
}
