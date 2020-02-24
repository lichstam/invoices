import { PDFEndpoint } from './constants';

export default async function (data = {}) {
  const token = localStorage.getItem('token');
  const response = await fetch(PDFEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.blob();
}
