// authUtils.js
import Cookies from 'js-cookie';

// Helper function to get the JWT token from the cookie
export const getAuthToken = () => Cookies.get('authToken');

// Helper function to create the config object with the Authorization header
export const getAuthConfig = () => {
  const authToken = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
};