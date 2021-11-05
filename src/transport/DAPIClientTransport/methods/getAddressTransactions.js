const logger = require('../../../logger');

module.exports = async function getAddressTransactions(address, offset, limit) {
  logger.silly('DAPIClientTransport.getAddressTransactions');
  return this.client.core.getAddressTransactions(address, offset, limit);
};
