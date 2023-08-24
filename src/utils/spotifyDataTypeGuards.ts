import { Artist, Album, Playlist, Show, Track } from '@spotify/web-api-ts-sdk';

export function isTrack(data: unknown): data is Track {
  return (
    Object.prototype.hasOwnProperty.call(data, 'album') &&
    Object.prototype.hasOwnProperty.call(data, 'artists') &&
    Object.prototype.hasOwnProperty.call(data, 'is_playable')
  );
}

export function isArtist(data: unknown): data is Artist {
  return (
    Object.prototype.hasOwnProperty.call(data, 'genres') &&
    Object.prototype.hasOwnProperty.call(data, 'followers') &&
    Object.prototype.hasOwnProperty.call(data, 'images')
  );
}

export function isAlbum(data: unknown): data is Album {
  return (
    Object.prototype.hasOwnProperty.call(data, 'album_type') &&
    Object.prototype.hasOwnProperty.call(data, 'artists') &&
    Object.prototype.hasOwnProperty.call(data, 'total_tracks')
  );
}

export function isPlaylist(data: unknown): data is Playlist {
  return (
    Object.prototype.hasOwnProperty.call(data, 'tracks') &&
    Object.prototype.hasOwnProperty.call(data, 'owner') &&
    Object.prototype.hasOwnProperty.call(data, 'images')
  );
}

export function isShow(data: unknown): data is Show {
  return (
    Object.prototype.hasOwnProperty.call(data, 'total_episodes') &&
    Object.prototype.hasOwnProperty.call(data, 'images') &&
    Object.prototype.hasOwnProperty.call(data, 'html_description')
  );
}
