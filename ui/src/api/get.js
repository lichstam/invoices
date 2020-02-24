
const cfg = (token) => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const get = (endpoint) => async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${endpoint}/${id}`, cfg(token));
  return response.json();
};

export const getAll = (endpoint) => async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${endpoint}`, cfg(token));
  return response.json();
};
