const logger = require('../../../logger');

module.exports = async function getAddressBalance(address) {
  logger.silly('DAPIClientTransport.getBestBlock');
  return this.client.core.getAddressBalance(address);
};
