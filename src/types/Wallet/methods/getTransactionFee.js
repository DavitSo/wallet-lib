module.exports = function getTransactionFee(address, amount) {
  if (!address || address.length === 0 || amount <= 0) {
    throw new Error('Expect valid input address and amount');
  }
  const { transport } = this;
  return transport.getTransactionFee(address, amount);
}
