const logger = require('../../../logger');

module.exports = async function getAddressTransactions(address) {
  logger.silly('DAPIClientTransport.getAddressTransactions');
  return this.client.core.getAddressTransactions(address);
};
