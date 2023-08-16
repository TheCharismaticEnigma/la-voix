import { Image } from './Image';

export interface SimplifiedArtist {
  external_urls: {
    spotify: string;
  };
  href: string; //  'https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of',
  id: string; //  '0LyfQWJT6nXafLPZqxe9Of',
  name: string; //  'Various Artists',
  type: 'artist';
  uri: string; // 'spotify:artist:0LyfQWJT6nXafLPZqxe9Of',
}

export interface SimplifiedAlbum {
  album_group?: string;

  album_type: 'album' | 'single' | 'compilation';

  artists: SimplifiedArtist[];

  external_urls: {
    spotify: string; // 'https://open.spotify.com/album/6SVGIzY211x8qah2FqH4Re';
  };

  href: string; //  'https://api.spotify.com/v1/albums/6SVGIzY211x8qah2FqH4Re';
  id: string; //  '6SVGIzY211x8qah2FqH4Re';
  images: Image[];
  is_playable: boolean;
  name: string; //  'Top Caribe';
  release_date: string; // '2011-07-11';
  release_date_precision: string; //  'day';
  total_tracks: number; // 36;
  type: 'album';
  uri: string; // 'spotify:album:6SVGIzY211x8qah2FqH4Re';
}
export interface Track {
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: object;
  external_urls: object;
  href: string; // link providing full details.
  id: string;
  is_playable: boolean;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
}
