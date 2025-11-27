// src/utils/extractArray.ts

export function extractArray(json: unknown): unknown[] {
   if (
      typeof json === "object" &&
      json !== null &&
      "data" in json
   ) {
      const record = json as Record<string, unknown>;
      const data = record.data;

      if (Array.isArray(data)) {
         return data;
      }
   }

   return [];
}
