import method from './method';

export const put = (endpoint) => (id, data) => method(`${endpoint}/${id}`, 'PUT', data);
