class BoundImportTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default BoundImportTable;
module.exports.BoundImportTable = BoundImportTable;