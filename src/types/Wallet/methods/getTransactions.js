module.exports = function getTransactions(address, offset = undefined, limit = undefined) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  if (limit && (limit < 1 || !Number.isInteger(limit))) {
    throw new Error('Expected valid limit value for request parameter');
  }
  if (offset && (offset < 0 || !Number.isInteger(limit))) {
    throw new Error('Expected valid offset value for request parameter');
  }
  if (offset && !limit) {
    throw new Error('Offset must be specified with limit parameter');
  }
  const { transport } = this;
  return transport.getAddressTransactions(address, offset, limit);
};
