export const API_ENDPOINTS = {
  GET_REPOS: (username) => `https://api.github.com/users/${username}/repos`,
  GET_ACCOUNT: (username) => `https://api.github.com/users/${username}`,
};

export const ITEMS_PER_PAGE = 10;
