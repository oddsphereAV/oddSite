// Imports Atro's tools
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Describe gallery 
const graphics = defineCollection({
    loader: glob({ base: './src/content/graphics', pattern: '**/*.md'}),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        kind: z.enum(['image', 'video', 'interactive']),
        tags: z.array(z.string()).default([]),
        madeIn: z.string().optional(),
        draft: z.boolean().default(false),
    }),
})

// Tell astro what exists
export const collections = { graphics };