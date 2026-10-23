import { getCollection, type CollectionEntry } from 'astro:content';

export type Release = CollectionEntry<'releases'>;
export type Track = CollectionEntry<'tracks'>;
export type TrackRow = { track: Track; release: Release };

export const typeLabel = { album: 'Album', ep: 'EP', single: 'Single' } as const;

// Published releases, newest first
export async function getReleases(): Promise<Release[]> {
    const releases = await getCollection('releases', ({ data }) => !data.draft);
    return releases.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Published tracks paired with their release, newest release first, then in track order.
// Tracks whose release is a draft (or missing) are left out.
export async function getTrackRows(): Promise<TrackRow[]> {
    const releases = new Map((await getReleases()).map((r) => [r.id, r]));
    const tracks = await getCollection('tracks', ({ data }) => !data.draft);

    return tracks
        .flatMap((track) => {
            const release = releases.get(track.data.release.id);
            return release ? [{ track, release }] : [];
        })
        .sort((a, b) =>
            b.release.data.date.valueOf() - a.release.data.date.valueOf() ||
            a.track.data.trackNumber - b.track.data.trackNumber);
}
