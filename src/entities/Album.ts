import { Image } from './Image';
import { Artist } from './Artist';
import { Track } from './Track';

export interface Album {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: 'album';
  uri: string;
  genres: string[];
  label: string;
  popularity: number;
  artists: Artist[];

  tracks: {
    href: string;
    limit: number;
    next: number | null;
    offset: number;
    previous: number | null;
    total: number;
    items: Track[];
  };
}
