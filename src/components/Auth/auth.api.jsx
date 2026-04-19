import axios from 'axios';
import { getDemoUserByCredentials, sanitizeUserForSession } from "./demoUsers";

const BASE_URL = "https://dummyjson.com";

export function loginApi(credentials) {
  const matchedUser = getDemoUserByCredentials(credentials);

  if (!matchedUser) {
    return Promise.reject({
      response: {
        data: {
          message: "Invalid email or password. Use a demo account from README.",
        },
      },
    });
  }

  return Promise.resolve({
    data: {
      accessToken: `demo-token-${matchedUser.id}`,
      user: sanitizeUserForSession(matchedUser),
    },
  });
}

export function registerApi(userData) {
  return axios.post(`${BASE_URL}/users/add`, userData);
}