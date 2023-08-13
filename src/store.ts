// Why Zustand? Hard to pass data w/ props when components are rendered w/ ROUTER.
// With Zustand, the need of prop drilling is eliminated.
// Anytime a property from the store changes, ALL COMPONENTS ARE RE-RENDERED.

import { create } from 'zustand';

interface SpotifyQueryObject {
  artistId: string;
  trackId?: string;
}

interface SpotifyStore {
  spotifyQuery: SpotifyQueryObject;
  setSelectedArtistId: (id: string) => void; // instead of passing it as a prop, we store it here.
  setSelectedTrackId: (id: string) => void;
}

const useSpotifyQueryStore = create<SpotifyStore>((set) => {
  return {
    spotifyQuery: {
      artistId: `03SZmfKAgYRQKUwy0EoJUa`,
    },

    setSelectedArtistId: (id: string) =>
      set((prevStore) => {
        return {
          // new store.
          spotifyQuery: { ...prevStore.spotifyQuery, artistId: id },
        };
      }),

    setSelectedTrackId: (id: string) =>
      set((prevStore) => {
        return {
          spotifyQuery: { ...prevStore.spotifyQuery, trackId: id },
        };
      }),
  };
});

export default useSpotifyQueryStore;
