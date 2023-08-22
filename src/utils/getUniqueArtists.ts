// returns a unique set of items.

import { Artist } from '../entities/Artist';

function getUniqueArtists(artists: Artist[]) {
  const uniqueArtists: Artist[] = [];

  for (const artist of artists) {
    const index = uniqueArtists.findIndex(
      (uniqueArtist) => uniqueArtist.id === artist.id
    );

    if (index === -1) uniqueArtists.push(artist);
  }

  return artists;
}

export default getUniqueArtists;
