// Imports Astro's tools
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { normalizeTag } from "./lib/tags";

// ---- Shared pieces ----

// Every collection uses the same tag field so search and tag pages work across the site
const tags = z.array(z.string().transform(normalizeTag)).default([]);

// A picture hosted on R2 (graphics.oddsphere.net)
const image = z.object({
    url: z.string().url(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    alt: z.string(),
    pixelated: z.boolean().default(false),
});

// "3:05" (what you type) -> 185 (what the site uses)
const duration = z.union([
    z.number().int().positive(),
    z.string()
        .regex(/^\d+:[0-5]\d$/, 'write the length as m:ss, in quotes, e.g. "3:05"')
        .transform((s) => {
            const [m, sec] = s.split(':').map(Number);
            return m * 60 + sec;
        }),
]);

// ---- Audio ----

// A release: album, EP or single. Its tracks point back to it.
const releases = defineCollection({
    loader: glob({ base: './src/content/releases', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        type: z.enum(['album', 'ep', 'single']),
        date: z.coerce.date(),
        artist: z.string().default('Oddsphere'),
        cover: image.optional(),
        genres: z.array(z.string()).default([]),
        tags,
        bandcamp: z.string().url().optional(), // buy / download link
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
    }).superRefine((data, ctx) => {
        if (!data.draft && !data.cover) {
            ctx.addIssue({ code: 'custom', path: ['cover'], message: 'a published release needs a cover' });
        }
    }),
});

// One row in the track table
const tracks = defineCollection({
    loader: glob({ base: './src/content/tracks', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        artist: z.string().default('Oddsphere'),
        release: reference('releases'),
        trackNumber: z.number().int().positive().default(1),
        genre: z.string(),
        bpm: z.number().positive(),
        key: z.string().optional(), // e.g. "F# minor"
        duration,
        audio: z.string().url(), // file on R2
        tags,
        draft: z.boolean().default(false),
    }),
});

// ---- Graphics ----

// One piece. Which extra fields are needed depends on `kind`.
const graphics = defineCollection({
    loader: glob({ base: './src/content/graphics', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        kind: z.enum(['image', 'video', 'interactive']),
        tags,
        madeIn: z.string().optional(),
        draft: z.boolean().default(false),

        cover: image.optional(), // thumbnail in the grid (falls back to the first image)
        images: z.array(image).default([]), // kind: image
        video: z.object({ // kind: video
            bunnyId: z.string().optional(),
            mp4: z.string().url().optional(),
            poster: image.optional(),
        }).optional(),
        shader: z.string().optional(), // kind: interactive, path to the .frag file in the repo
    }).superRefine((data, ctx) => {
        if (data.draft) return;
        if (data.kind === 'image' && data.images.length === 0) {
            ctx.addIssue({ code: 'custom', path: ['images'], message: 'an image piece needs at least one image' });
        }
        if (data.kind === 'video' && !data.video?.bunnyId && !data.video?.mp4) {
            ctx.addIssue({ code: 'custom', path: ['video'], message: 'a video piece needs a bunnyId or an mp4' });
        }
        if (data.kind === 'interactive' && !data.shader) {
            ctx.addIssue({ code: 'custom', path: ['shader'], message: 'an interactive piece needs a shader file' });
        }
        if (!data.cover && data.images.length === 0 && !data.video?.poster) {
            ctx.addIssue({ code: 'custom', path: ['cover'], message: 'needs a cover (or an image / video poster) for the grid' });
        }
    }),
});

// ---- Log ----

const log = defineCollection({
    loader: glob({ base: './src/content/log', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        description: z.string().optional(),
        cover: image.optional(),
        tags,
        draft: z.boolean().default(false),
    }),
});

// ---- About ----

const about = defineCollection({
    loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string().default('About'),
        photo: image.optional(),
    }),
});

// Tell astro what exists
export const collections = { releases, tracks, graphics, log, about };
