import {resourceDataEntry} from './resourceDataEntry.js'
class resourceEntry {
  constructor(buffer, offset) {
    this.startOffset = offset;
    this.namedId = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.data = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.length = offset - this.startOffset;

    this.dataDetail = new resourceDataEntry(buffer, this.data);
  }
}
export default resourceEntry;
module.exports.resourceEntry = resourceEntry;