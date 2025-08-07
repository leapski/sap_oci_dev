async function getProducts() {
    // Mock product data
    return [
      { id: 1, name: 'Product A', price: 10.99, currency: 'USD', partNumber: 'A001', vendor: 'VendorX' },
      { id: 2, name: 'Product B', price: 12.49, currency: 'USD', partNumber: 'B002', vendor: 'VendorX' },
      { id: 3, name: 'Product C', price: 8.75, currency: 'USD', partNumber: 'C003', vendor: 'VendorY' },
      { id: 4, name: 'Product D', price: 15.00, currency: 'USD', partNumber: 'D004', vendor: 'VendorY' },
      { id: 5, name: 'Product E', price: 9.99, currency: 'USD', partNumber: 'E005', vendor: 'VendorZ' },
      { id: 6, name: 'Product F', price: 11.25, currency: 'USD', partNumber: 'F006', vendor: 'VendorZ' },
      { id: 7, name: 'Product G', price: 13.50, currency: 'USD', partNumber: 'G007', vendor: 'VendorX' },
    ];
  }
  
  module.exports = { getProducts }; 