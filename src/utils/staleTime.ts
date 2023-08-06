import ms from 'ms';

const staleTime = (time?: string) => {
  if (!time) return;

  return ms(time);
};

export default staleTime;
