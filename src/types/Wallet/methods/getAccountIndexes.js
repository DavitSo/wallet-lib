/**
 * Return wallet's account indexes
 * @returns {*}
 */
function getAccountsIndexes() {
  return this.accounts.map((el) => el.index);
}

module.exports = getAccountsIndexes;
