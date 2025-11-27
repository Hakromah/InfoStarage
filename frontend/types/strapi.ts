// types/strapi.ts
import { z } from "zod";

export interface LinkProps {
   id: number;
   text: string;
   href: string;
   isExternal: boolean;
}
export interface ImageProps {
   id: number;
   documentId: string;
   url: string;
   alternativeText: string;
}
type ComponentType = "blocks.hero-section";

interface Base<
   T extends ComponentType,
   D extends object = Record<string, unknown>
> {
   id: number;
   __component?: T;
   documentId?: string;
   createdAt?: string;
   updatedAt?: string;
   publishedAt?: string;
   data?: D;
}
export type Block =
   | HeroSectionProps

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
   heading: string;
   image: ImageProps;
   link?: LinkProps;
}

/* -----------------------------------------------------------
   STRAPI IMAGE TYPES
----------------------------------------------------------- */
export const StrapiImageAttrSchema = z.object({
   url: z.string(),
   alternativeText: z.string().optional(),
});

export const StrapiImageDataSchema = z.object({
   data: z
      .object({
         id: z.number(),
         attributes: StrapiImageAttrSchema,
      })
      .nullable(),
});

/* -----------------------------------------------------------
   COMPONENT: HERO SECTION
----------------------------------------------------------- */
export const HeroSectionSchema = z.object({
   id: z.number(),
   // ⭐ FIX: Change "home.hero-section" to "layout.hero-section"
   __component: z.literal("layout.hero-section"),
   heading: z.string().optional(),
   subHeading: z.string().optional(),
   image: StrapiImageDataSchema.optional(),
   link: z
      .object({
         id: z.number().optional(),
         url: z.string(),
         text: z.string(),
         isExternal: z.boolean().optional(),
      })
      .optional(),
});

export type HeroSection = z.infer<typeof HeroSectionSchema>;

// ... rest of the file
/* -----------------------------------------------------------
   COMPONENT: FOOTER SECTION
----------------------------------------------------------- */
export const FooterSectionSchema = z.object({
   id: z.number(),
   __component: z.literal("layout.footer"),
   copyright: z.string(),
});

export type FooterSection = z.infer<typeof FooterSectionSchema>;

/* -----------------------------------------------------------
   HOME PAGE (Single Type)
----------------------------------------------------------- */
export const HomePageSchema = z.object({
   id: z.number(),
   attributes: z.object({
      title: z.string(),
      description: z.string().optional(),
      blocks: z.array(z.union([HeroSectionSchema, FooterSectionSchema])),
   }),
});

export type HomePageData = z.infer<typeof HomePageSchema>;

/* -----------------------------------------------------------
   PASSWORD ENTRY (Collection Type)
----------------------------------------------------------- */
export const PasswordEntrySchema = z.object({
   id: z.number(),
   attributes: z.object({
      appName: z.string(),
      email: z.string().email(),
      text: z.string(),
      createdAt: z.string().optional(),
   }),
});

export type PasswordEntry = z.infer<typeof PasswordEntrySchema>;

export type PasswordEntryResponse = {
   data: PasswordEntry[];
};


