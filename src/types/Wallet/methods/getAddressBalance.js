module.exports = function getAddressBalance(address) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  const { transport } = this;
  return transport.getAddressBalance(address);
}
