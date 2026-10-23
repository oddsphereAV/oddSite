// One spelling per tag, so "Drum & Bass", "drum-and-bass" and " drum and bass " all match
export function normalizeTag(tag: string): string {
    return tag
        .trim()
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
