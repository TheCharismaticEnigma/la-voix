const artistsId = [
  '4YRxDV8wJFPHPTeXepOstw',
  '4fEkbug6kZzzJ8eYX6Kbbp',
  '1wRPtKGflJrBx9BmLsSwlU',
];

const randomArtistId = () => {
  const index = Math.floor(Math.random() * artistsId.length);
  return artistsId[index];
};

export default randomArtistId;
