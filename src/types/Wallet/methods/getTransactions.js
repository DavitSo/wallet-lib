module.exports = function getTransactions(address, offset = undefined, limit = undefined) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  const { transport } = this;
  return transport.getAddressTransactions(address, offset, limit);
};
