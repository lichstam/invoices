const getObjectToGenerate = ({ invoice, client, user }) => {
  const { revisions, taxInPercent, _id } = invoice;
  const lastRevision = revisions[revisions.length - 1];
  const { terms, date, items } = lastRevision;
  const subtotal = items.reduce((sum, item) => item.amount + sum, 0);
  const tax = ((taxInPercent / 100) * subtotal);
  const total = tax + subtotal;

  return {
    user,
    client,
    items,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    invoiceNbr: _id,
    terms,
    date,
  };
};

export default getObjectToGenerate;
