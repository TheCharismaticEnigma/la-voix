import { Artist } from '../entities/Artist';

const artist: Artist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/3OLGltG8UPIea8sA4w0yg0',
  },
  followers: {
    href: null,
    total: 16284476,
  },
  genres: [
    'classic pakistani pop',
    'filmi',
    'modern bollywood',
    'qawwali',
    'sufi',
  ],
  href: 'https://api.spotify.com/v1/artists/3OLGltG8UPIea8sA4w0yg0',
  id: '3OLGltG8UPIea8sA4w0yg0',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5ebac45eaf028dc58810df0f382',
      width: 640,
    },
    {
      height: 320,
      url: 'https://i.scdn.co/image/ab67616100005174ac45eaf028dc58810df0f382',
      width: 320,
    },
    {
      height: 160,
      url: 'https://i.scdn.co/image/ab6761610000f178ac45eaf028dc58810df0f382',
      width: 160,
    },
  ],
  name: 'Rahat Fateh Ali Khan',
  popularity: 71,
  type: 'artist',
  uri: 'spotify:artist:3OLGltG8UPIea8sA4w0yg0',
};

export default artist;
