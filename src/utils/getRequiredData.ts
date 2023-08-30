// Takes in Spotify Data object and returns specific parts ACCORDING TO THE TAG.
// { image[], id, type,}
// Card wrapped in Link, card image, name, detais.

import { Image } from '../entities/Image';

import {
  isTrack,
  isArtist,
  isAlbum,
  isShow,
  isPlaylist,
} from './spotifyDataTypeGuards';

interface QueryCardData {
  type: string;
  id: string;
  images: Image[];
  name: string;
  queryCardLink?: string;
  trackAlbumId?: string;
}

// Use Type Predicate to get the data,

const getRequiredData = (
  queryTag: string,
  data: unknown
): QueryCardData | null => {
  switch (queryTag) {
    case 'track': {
      if (isTrack(data))
        return {
          type: data.type,
          id: data.id,
          name: data.name,
          images: data.album.images,
          trackAlbumId: data.album.id,
        };

      return null;
    }
    case 'artist': {
      if (isArtist(data))
        return {
          id: data.id,
          type: data.type,
          name: data.name,
          images: data.images,
          queryCardLink: `/${data.type}/${data.id}`,
        };

      return null;
    }
    case 'album': {
      if (isAlbum(data))
        return {
          id: data.id,
          type: data.type,
          name: data.name,
          images: data.images,
          queryCardLink: `/${data.type}/${data.id}`,
        };

      return null;
    }
    case 'show': {
      if (isShow(data))
        return {
          id: data.id,
          type: data.type,
          name: data.name,
          images: data.images,
          queryCardLink: `/${data.type}/${data.id}`,
        };

      return null;
    }
    case 'playlist': {
      if (isPlaylist(data))
        return {
          id: data.id,
          type: data.type,
          name: data.name,
          images: data.images,
          queryCardLink: `/${data.type}/${data.id}`,
        };
      return null;
    }
  }

  return null;
};

export default getRequiredData;
