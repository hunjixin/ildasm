class SecurityTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default SecurityTable;
module.exports.SecurityTable = SecurityTable;