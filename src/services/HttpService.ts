import axios, { AxiosRequestConfig } from 'axios';
import staleTime from '../utils/staleTime';

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

export interface SpotifyAllAlbumsResponse<T> {
  href: string;
  offset: number;
  limit: number;
  previous: string | null;
  next: string | null;
  total: number;
  items: T[];
}

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

// As soon as the document is loaded, fetch the access token.
// document (DomContentLoaded) | window (load).
// Implement HTTP Caching in order to cache the access token for 1 hour.
// page session lasts while tab/ browser is open, and survives over page reloads/restores.

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

document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('token')) {
    getAccessToken().then((token) => {
      sessionStorage.setItem('token', token);
    });
  }

  setInterval(() => {
    getAccessToken().then((token) => {
      sessionStorage.setItem('token', token);
    });
  }, staleTime('0.8h'));
});

class HttpService<T> {
  #accessToken = sessionStorage.getItem('token');
  #endPoint;

  constructor(path: string) {
    this.#endPoint = path;
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
      .get<SpotifyAllAlbumsResponse<T>>(this.#endPoint, {
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
