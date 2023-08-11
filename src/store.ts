// Why Zustand? Hard to pass data w/ props when components are rendered w/ ROUTER.
// With Zustand, the need of prop drilling is eliminated.
// Anytime a property from the store changes, ALL COMPONENTS ARE RE-RENDERED.

import { create } from 'zustand';

interface SpotifyQueryObject {
  artistId: string;
}

interface SpotifyStore {
  spotifyQuery: SpotifyQueryObject;
  setSelectedArtistId: (id: string) => void; // instead of passing it as a prop, we store it here.
}

const useSpotifyQueryStore = create<SpotifyStore>((set) => {
  return {
    spotifyQuery: {
      artistId: '',
    },

    setSelectedArtistId: (id: string) =>
      set((prevStore) => {
        return {
          // new store.
          spotifyQuery: { ...prevStore.spotifyQuery, artistId: id },
        };
      }),
  };
});

export default useSpotifyQueryStore;
