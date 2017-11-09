class IatTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default IatTable;
module.exports.IatTable = IatTable;