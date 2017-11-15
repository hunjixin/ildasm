import  {COFFHeader} from './COFFHeader.js';
import  {OptionalHeader} from './OptionalHeader.js';

/**
 * peHeader
 */
class PEHeader {
    constructor (buffer, dosHeader) {
      var offset=dosHeader.e_lfanew;
      this.startOffset = offset;
  
      this.signature = buffer.readUInt32LE(offset);
      offset = offset + 4;
  
      this.coffHeader = new COFFHeader(buffer, offset);
      offset = offset + this.coffHeader.length;
  
      this.optionHeader = new OptionalHeader(buffer, offset, this.coffHeader,this.dosHeader);
      offset = offset + this.optionHeader.length;
  
      this.length = offset - this.startOffset;
    }
  }
  
  export default PEHeader;
  module.exports.PEHeader = PEHeader;