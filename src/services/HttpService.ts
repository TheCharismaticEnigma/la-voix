import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

// NOTE: If neither market nor user country are provided,
// the content is considered unavailable for the client.

export interface SpotifyApiResponse<T> {
  status: number;
  statusText: string;
  headers: AxiosHeaders;
  data: T;
}

class HttpService<T> {
  #accessToken = '';
  #endPoint;

  constructor(path: string, accessToken: string) {
    this.#endPoint = path;
    this.#accessToken = accessToken;
  }

  get(requestConfig: AxiosRequestConfig = {}) {
    axios
      .get<SpotifyApiResponse<T>>(
        `https://api.spotify.com/v1${this.#endPoint}`,
        {
          ...requestConfig,
          params: {
            ...requestConfig?.params,
            market: 'IN',
          },
          headers: {
            ...requestConfig?.headers,
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  }
}

export default HttpService;

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
