import InvoiceOverview from '../containers/InvoiceOverview';
import InvoiceSettings from '../containers/InvoiceSettings';
import Register from '../containers/Register';

export default [
  {
    path: '/(|register)', Component: Register, label: 'Register', type: 'public', exact: true,
  },
  {
    path: '/invoices', Component: InvoiceOverview, label: 'InvoiceOverview', type: 'private', exact: true,
  },
  {
    path: '/invoices/settings/:id', Component: InvoiceSettings, label: 'InvoiceSettings', type: 'private', exact: true,
  },
];
