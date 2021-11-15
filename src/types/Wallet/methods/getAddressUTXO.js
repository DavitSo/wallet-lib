const { Transaction, Address } = require('@dashevo/dashcore-lib');

module.exports = function getAddressUTXO(address) {
  if (!address || address.length === 0) {
    throw new Error('Expect valid address');
  }
  const { transport } = this;
  return transport.getAddressUTXO(address).then((result) => {
    const utxos = [];

    result.utxos.forEach((utxo) => {
      utxos.push(new Transaction.UnspentOutput(
        {
          txId: utxo.transactionId,
          vout: parseInt(utxo.outputIndex, 10),
          script: utxo.script,
          satoshis: utxo.satoshis,
          address: new Address(utxo.address, this.network),
        },
      ));
    });
    return utxos.sort((a, b) => b.satoshis - a.satoshis);
  }).catch((error) => {
    throw error;
  });
};
