import { Image } from './Image';

export interface Artist {
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number; //  86;
  uri: string;
  type: 'artist';
  external_urls: {
    spotify: string;
  };

  followers: {
    href: string | null;
    total: number; //  18588479;
  };
}
