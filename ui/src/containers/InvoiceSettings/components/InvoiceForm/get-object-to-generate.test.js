import getObjectToGenerate from './get-object-to-generate';

describe('#get object to generate', () => {
  const invoice = {
    _id: 'invoice id',
    clientId: 'client',
    userId: 'user',
    taxInPercent: 10,
    currency: 'USD',
    revisions: [{
      terms: 'Pay within 10 days',
      date: 'date',
      items: [{
        name: 'Hard work',
        description: 'very hard work',
        price: 1000,
        rate: 1,
        amount: 10,
      }],
    },
    {
      terms: 'Pay within 20 days',
      date: 'newer date',
      items: [
        {
          name: 'TC 100',
          description: 'Toner Cartridge',
          price: 3000,
          rate: 2,
          amount: 6000,
        },
        {
          name: 'USB_EXT',
          description: 'USB Cable Extender',
          price: 1000,
          rate: 2,
          amount: 2000,
        },
      ],
    }],
  };

  const client = {
    _id: 'client',
    name: 'John Doe',
    street: '1234 Main Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    zipcode: 94111,
  };

  const user = {
    name: 'John Doe',
    street: '1234 Main Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    zipcode: 94111,
    email: 'john@doe.com',
    website: 'www.joedoe.com',
    number: '112',
  };

  it('Should return correct tree', () => {
    // Last revision (in array) wanted
    const expected = {
      user,
      client,
      items: [
        {
          name: 'TC 100',
          description: 'Toner Cartridge',
          price: 3000,
          rate: 2,
          amount: 6000,
        },
        {
          name: 'USB_EXT',
          description: 'USB Cable Extender',
          price: 1000,
          rate: 2,
          amount: 2000,
        },
      ],
      subtotal: '8000.00',
      tax: '800.00',
      total: '8800.00',
      invoiceNbr: 'invoice id',
      terms: 'Pay within 20 days',
      date: 'newer date',
    };
    expect(getObjectToGenerate({ client, user, invoice })).toEqual(expected);
  });
});
