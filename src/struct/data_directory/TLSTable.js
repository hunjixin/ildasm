class TLSTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default TLSTable;
module.exports.TLSTable = TLSTable;