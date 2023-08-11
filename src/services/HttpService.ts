import axios, { AxiosRequestConfig } from 'axios';

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

class HttpService<T> {
  #accessToken;
  #endPoint;

  constructor(path: string, accessToken: string) {
    this.#endPoint = path;
    this.#accessToken = accessToken;
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
}

export default HttpService;

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
