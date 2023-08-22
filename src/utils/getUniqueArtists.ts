// returns a unique set of items.

import { Artist } from '../entities/Artist';

function getUniqueArtists(artist: Artist, artists: Artist[]) {
  const targetIndex = artists.findIndex(
    (relatedArtist) => relatedArtist.id === artist.id
  );

  if (targetIndex > -1) {
    const selectedArtist = artists.splice(targetIndex, 1)[0];
    artists.unshift(selectedArtist);
    return artists;
  }

  return [artist, ...artists];
}

export default getUniqueArtists;
