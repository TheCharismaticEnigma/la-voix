// Why Zustand? Hard to pass data w/ props when components are rendered w/ ROUTER.
// With Zustand, the need of prop drilling is eliminated.

import { create } from 'zustand';

interface SpotifyQueryObject {
  artistId?: string;
}

interface SpotifyStore {
  spotifyQuery: SpotifyQueryObject;
  setSelectedArtistId: (id: string) => void; // instead of passing it as a prop, we store it here.
}

const useSpotifyQueryStore = create<SpotifyStore>((set) => ({
  // Initial state of the store.
  spotifyQuery: {},

  setSelectedArtistId: (id) =>
    set(() => ({
      spotifyQuery: { artistId: id },
    })),
}));

export default useSpotifyQueryStore;
