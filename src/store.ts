// Why Zustand? Hard to pass data w/ props when components are rendered w/ ROUTER.
// With Zustand, the need of prop drilling is eliminated.
// Anytime a property from the store changes, ALL COMPONENTS ARE RE-RENDERED.
// Server State : Hooks, React Query. Client State: Zustand

import { create } from 'zustand';
import initialIds from './initialData/initialIds';

const { artistId, trackId, albumId } = initialIds();

interface SpotifyQueryObject {
  artistId: string;
  trackId: string;
  albumId: string;
  playlistId?: string;
  showId?: string;
  searchQuery?: string;
  searchQueryTag?: string;
}

interface SpotifyStore {
  spotifyQuery: SpotifyQueryObject;
  setSelectedArtistId: (id: string) => void; // instead of passing it as a prop, we store it here.
  setSelectedTrackId: (id: string) => void;
  setSelectedAlbumId: (id: string) => void;
  setSelectedPlaylistId: (id: string) => void;
  setSelectedShowId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSearchQueryTag: (tag: string) => void;
}

const useSpotifyQueryStore = create<SpotifyStore>((set) => {
  return {
    spotifyQuery: {
      artistId,
      trackId,
      albumId,
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

    setSelectedAlbumId: (id: string) =>
      set((prevStore) => {
        return {
          spotifyQuery: { ...prevStore.spotifyQuery, albumId: id },
        };
      }),

    setSelectedPlaylistId: (id: string) =>
      set((prevStore) => {
        return {
          spotifyQuery: { ...prevStore.spotifyQuery, playlistId: id },
        };
      }),

    setSelectedShowId: (id: string) =>
      set((prevStore) => {
        return {
          spotifyQuery: { ...prevStore.spotifyQuery, showId: id },
        };
      }),

    setSearchQuery: (query: string) =>
      set((prevStore) => {
        const searchTag = prevStore.spotifyQuery?.searchQueryTag || 'track'; // REQUIRED

        return {
          spotifyQuery: {
            ...prevStore.spotifyQuery,
            searchQuery: query,
            searchQueryTag: searchTag,
          },
        };
      }),

    setSearchQueryTag: (tag: string) =>
      set((prevStore) => {
        return {
          spotifyQuery: { ...prevStore.spotifyQuery, searchQueryTag: tag },
        };
      }),
  };
});

export default useSpotifyQueryStore;
