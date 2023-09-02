import useSpotifyQueryStore from '../store';
import NowPlayingEpisode from './NowPlayingEpisode';
import NowPlayingTrack from './NowPlayingTrack';

const NowPlayingContent = () => {
  const { trackIsEpisode, episodeId, artistId } = useSpotifyQueryStore(
    (s) => s.spotifyQuery
  );

  if (trackIsEpisode && episodeId) return <NowPlayingEpisode />;

  if (!trackIsEpisode && !episodeId && artistId) return <NowPlayingTrack />;

  return null;
};

export default NowPlayingContent;
