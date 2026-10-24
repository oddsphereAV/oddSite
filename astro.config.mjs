// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // The site is one page now. Old section links go to the home page.
    // Deeper paths (/audio/some-release) are redirected by public/_redirects on Cloudflare.
    redirects: {
        '/audio': '/',
        '/graphics': '/',
        '/about': '/',
        '/log': '/',
    },
});
