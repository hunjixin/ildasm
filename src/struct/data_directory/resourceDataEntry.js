class resourceDataEntry {
  constructor(buffer, offset) {
    this.startOffset = offset;
    this.data = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.size = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.codePage = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.reserved = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.length = offset - this.startOffset;
  }
}
export default resourceDataEntry;
module.exports.resourceDataEntry = resourceDataEntry;