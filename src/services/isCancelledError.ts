import { CanceledError } from 'axios';

const isCancelledError = (error: Error) => {
  return error instanceof CanceledError && error.name === 'CanceledError';
};

export default isCancelledError;
