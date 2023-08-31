import getConfig from 'next/config';

export function getBackendUrl() {
  const {
    serverRuntimeConfig: { BACKEND_URL },
  } = getConfig();
  return BACKEND_URL;
}

export function getBackendApiKey() {
  const {
    serverRuntimeConfig: { API_KEY },
  } = getConfig();
  return API_KEY;
}
