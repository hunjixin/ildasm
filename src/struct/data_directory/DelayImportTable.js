class DelayImportTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default DelayImportTable;
module.exports.DelayImportTable = DelayImportTable;