import { Image } from './Image';

export interface Artist {
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number; //  86;
  type: 'artist';
  followers: {
    total: number; //  18588479;
  };
}
