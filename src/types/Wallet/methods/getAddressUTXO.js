module.exports = function getAddressUTXO(address) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  const { transport } = this;
  return transport.getAddressUTXO(address);
};
