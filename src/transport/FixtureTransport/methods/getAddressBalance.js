const logger = require('../../../logger');

module.exports = async function getAddressBalance(address) {
  logger.silly('FakeNet.getAddressBalance');
  return 100;
};
