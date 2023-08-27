import axios, { AxiosRequestConfig } from 'axios';
import {
  START_TIME_KEY,
  ACCESS_TOKEN_KEY,
  CLIENT_ID,
  REFRESH_TOKEN_KEY,
} from '../utils/credentials';
import { AccessToken } from '@spotify/web-api-ts-sdk';

// NOTE: If neither market nor user country are provided,
// the content is considered unavailable for the client.

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  params: {
    market: 'IN',
  },
});

export interface FetchResponse<T> {
  [key: string]: T[];
}

export interface SpotifyItemsResponse<T> {
  href: string;
  offset: number;
  limit: number;
  previous: string | null;
  next: string | null;
  total: number;
  items: T[];
}

/*
function getAccessToken() {
  return axios
    .post<AccessToken>(
      'https://accounts.spotify.com/api/token',
      {
        // HTTP Body
        grant_type: 'client_credentials',
        client_id: '11d32aea63554cd2aeee7d3c935949d7',
        client_secret: '05f11e570dfa4fc39999c9bcf77717e3',
      },
      {
        // axios Config object.
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then(({ data }) => {
      return data.access_token;
    });
}
*/

export const tokenIsExpired = () => {
  const sessionStartTime = localStorage.getItem(START_TIME_KEY);
  return (
    sessionStartTime && new Date().getTime() - +sessionStartTime > 3500 * 1000
  ); // 1h = 3600 * 1000 ms
};

export const refreshToken = () => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);

  const httpData = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
    client_id: CLIENT_ID,
  };

  const requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  axios
    .post<AccessToken>(
      'https://accounts.spotify.com/api/token',
      httpData,
      requestConfig
    )
    .then(({ data }) => {
      // alreadySent = false;
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      console.log('ACCESS TOKEN CHANGED');
    })
    .catch((error) => {
      console.log('ACCESS TOKEN REFETCH FAILURE:', error);
    });
};

class HttpService<T> {
  #accessToken;
  #endPoint;
  #tokenId = ACCESS_TOKEN_KEY;

  constructor(path: string) {
    this.#endPoint = path;

    this.#accessToken = localStorage.getItem(this.#tokenId);
  }

  get(requestConfig?: AxiosRequestConfig) {
    const token = this.#accessToken;

    const result = axiosInstance
      .get<T>(this.#endPoint, {
        ...requestConfig,
        headers: {
          ...requestConfig?.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        return response.data;
      });

    return result;
  }

  getAll(requestConfig?: AxiosRequestConfig) {
    const token = this.#accessToken;

    const result = axiosInstance
      .get<FetchResponse<T>>(this.#endPoint, {
        ...requestConfig,
        headers: {
          ...requestConfig?.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        return response.data;
      });

    return result;
  }

  getArtistsAlbums(requestConfig?: AxiosRequestConfig) {
    const token = this.#accessToken;

    const result = axiosInstance
      .get<SpotifyItemsResponse<T>>(this.#endPoint, {
        ...requestConfig,
        headers: {
          ...requestConfig?.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });

    return result;
  }

  getSearchQueries(requestConfig?: AxiosRequestConfig) {
    const token = this.#accessToken;

    const result = axiosInstance
      .get<SpotifyItemsResponse<T>>(this.#endPoint, {
        ...requestConfig,
        headers: {
          ...requestConfig?.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });

    return result;
  }
}

export default HttpService;

// When returning single data from response, reference only the schema of the data in generic brackets.
// When returning an array or something, put the response schema (object encompassing the data)
// in the generic brackets.

// .then() method always returns a promise. The returned value will be passed as
// argument to the SUCCESS CALLBACK OF THE .then(successCallback, errorCallback) method.

/* 
 Spotify Web API provides different endpoints depending on the data we want to 
 access. 
 API calls must include the Authorization header along with a valid access token.
*/

/*
axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        params: {
          market: 'IN',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.message));

    axios.create({
    baseURL: 'https://api.spotify.com/v1',
    params: {
      market: 'IN',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
       
  });
      
*/
