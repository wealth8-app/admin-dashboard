/* eslint-disable indent */
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

function useApi() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const api = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json ',
    },
  });

  const addTokenToRequest = async (request) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
      });
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    } catch (error) {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
      });
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    }
  };

  api.interceptors.request.use(addTokenToRequest);

  return api;
}

export default useApi;
