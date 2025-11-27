// types/password.ts
export type PasswordEntry = {
   id: number;
   documentId?: string;
   appName: string;
   email: string;
   text: string;
   createdAt?: string;
   updatedAt?: string;
   publishedAt?: string;
};
