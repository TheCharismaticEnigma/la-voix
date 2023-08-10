const isCancelledError = (error: Error) => {
  return error.name === 'CanceledError';
};

export default isCancelledError;
