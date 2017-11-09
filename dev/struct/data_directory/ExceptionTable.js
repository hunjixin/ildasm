class ExceptionTable {
  constructor(buffer, offset) {
    this.startOffset = offset;
    this.pData = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.length = offset - this.startOffset;
  }
}

export default ExceptionTable;
module.exports.ExceptionTable = ExceptionTable;