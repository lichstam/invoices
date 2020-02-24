import { clientEndpoint } from './constants';
import { get, getAll } from './get';

export const getClient = get(clientEndpoint);
export const getAllClients = getAll(clientEndpoint);
