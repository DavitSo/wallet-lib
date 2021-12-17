/**
 * Return wallet's account indexes
 * @returns {*}
 */
function getAccountIndexes() {
  return this.accounts((el) => el.index);
}

module.exports = getAccountIndexes;