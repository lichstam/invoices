import method from './method';

export const post = (endpoint) => (data) => method(endpoint, 'POST', data);
