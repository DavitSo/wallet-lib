module.exports = function getTransactions(address) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  const { transport } = this;
  return transport.getAddressTransactions(address);
};
