import { invoiceEndpoint } from './constants';
import { get, getAll } from './get';

export const getInvoice = get(invoiceEndpoint);
export const getAllInvoices = getAll(invoiceEndpoint);
