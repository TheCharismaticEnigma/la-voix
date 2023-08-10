const artistsId = [
  '03SZmfKAgYRQKUwy0EoJUa',
  '4YRxDV8wJFPHPTeXepOstw',
  '4fEkbug6kZzzJ8eYX6Kbbp',
  '1wRPtKGflJrBx9BmLsSwlU',
  '3OLGltG8UPIea8sA4w0yg0',
  '6ohaQzKaXrobAL8paLSaxq',
  '5GnnSrwNCGyfAU4zuIytiS',
  '3eDT9fwXKuHWFvgZaaYC5v',
  '71oGOxg5ez52Hh1Ye41A98',
  '4oVMLzAqW6qhRpZWt8fNw4',
  '6CXEwIaXYfVJ84biCxqc9k',
  '0L5GV6LN8SWWUWIdBbTLTZ',
  '09UmIX92EUH9hAK4bxvHx6',
  '0sSxphmGskGCKlwB9xa6WU',
];

const randomArtistId = () => {
  const index = Math.floor(Math.random() * artistsId.length);
  return artistsId[index];
};

export default randomArtistId;
