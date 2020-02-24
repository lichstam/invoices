const PDFDocument = require('pdfkit');

// Borrowed this template here:
// https://github.com/PSPDFKit-labs/pdfkit-invoice/blob/master/createInvoice.js

function generateHeader(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text(invoice.user.name, 110, 57)
    .fontSize(10)
    .text(invoice.user.name, 200, 50, { align: 'right' })
    .text(invoice.user.street, 200, 65, { align: 'right' })
    .text(`${invoice.user.city}, ${invoice.user.state}, ${invoice.user.zipcode}`, 200, 80, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Invoice', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoiceNbr, 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font('Helvetica-Bold')
    .text(invoice.client.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.client.street, 300, customerInformationTop + 15)
    .text(
      `${invoice.client.city
      }, ${
        invoice.client.state
      }, ${
        invoice.client.country}`,
      300,
      customerInformationTop + 30,
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Description',
    'Unit Cost',
    'Quantity',
    'Amount',
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      item.description,
      item.price,
      item.rate,
      item.amount,
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    invoice.subtotal,
  );

  const paidToDatePosition = subtotalPosition + 20;

  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'Tax',
    '',
    invoice.tax,
  );

  const duePosition = paidToDatePosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Balance Due',
    '',
    invoice.total,
  );
  doc.font('Helvetica');
}

function generateFooter(doc, invoice) {
  doc
    .fontSize(10)
    .text(
      invoice.terms,
      50,
      780,
      { align: 'center', width: 500 },
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal,
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}

function createInvoice(invoice) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);
  return doc;
}

module.exports = createInvoice;
