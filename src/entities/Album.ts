import { Image } from './Image';
import { SimplifiedArtist } from './Track';

export interface Copyrights {
  text: string; // '2008 YRF Music';
  type: string; // 'C';
}

export interface ExternalId {
  amgid?: string; //  'YRMCD90050',
  upc?: string; // '0849486008052',
}

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  disc_number: number; //  1;
  duration_ms: number; // 281573;
  explicit: boolean; //  false;
  external_urls: {
    spotify: string; //  'https://open.spotify.com/track/2LcXJP95e4HKydTZ2mYfrx';
  };
  href: string; // 'https://api.spotify.com/v1/tracks/2LcXJP95e4HKydTZ2mYfrx';
  id: string; //  '2LcXJP95e4HKydTZ2mYfrx';
  is_local: boolean;
  is_playable: boolean;
  name: string; //  'Tujh Mein Rab Dikhta Hai';
  preview_url: string; //  'https://p.scdn.co/mp3-preview/7b8a959f5834cc7c483751f1a410417357044084?cid=11d32aea63554cd2aeee7d3c935949d7';
  track_number: number;
  type: 'track';
  uri: string; //  'spotify:track:2LcXJP95e4HKydTZ2mYfrx';
}
export interface Album {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  available_markets?: string[];
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
  artists: SimplifiedArtist[];
  copyrights: Copyrights[];
  external_ids: ExternalId;
  is_playable: boolean;

  tracks: {
    href: string;
    limit: number;
    next: number | null;
    offset: number;
    previous: number | null;
    total: number;
    items: SimplifiedTrack[];
  };
}
