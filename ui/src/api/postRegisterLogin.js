export default (endpoint) => async (data = {}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const msg = await response.json();
    throw new Error(msg);
  }
  return response;
};
