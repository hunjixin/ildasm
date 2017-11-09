class ComDescriptionTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default ComDescriptionTable;
module.exports.ComDescriptionTable = ComDescriptionTable;