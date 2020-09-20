function user(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  if (endpoint[0] !== '/') {
    endpoint = '/'.concat(endpoint);
  }

  return fetch(`${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
}

// eslint-disable-next-line import/prefer-default-export
export { user };
