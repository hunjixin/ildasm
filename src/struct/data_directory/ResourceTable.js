import {resourceEntry} from './resourceEntry.js';
class ResourceTable {
    constructor(reader,buffer, pEntity) {
        if(pEntity.sizeOfResourceTable==0)return;
        var offset=  reader.peHeader.optionHeader.RVAToOffset(pEntity.resourceTable,reader.sectionHeaders).foa ;
        this.startOffset = offset;
        this.charachteristics = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.timeDateStamp = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.majorVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.minorVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.numberOfNameEntries = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.numberOfIdEntries = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.nameEntries = [];
        for (var i = 0; i < this.numberOfNameEntries; i++) {
            var entry = new resourceEntry(buffer, offset);
            offset = offset + entry.length;
            this.nameEntries.push(entry);
        }
        this.idEntries = [];
        for (var i = 0; i < this.numberOfIdEntries; i++) {
            var entry = new resourceEntry(buffer, offset);
            offset = offset + entry.length;
            this.idEntries.push(entry);
        }
        this.length = offset - this.startOffset;
    }
}

export default ResourceTable;
module.exports.ResourceTable = ResourceTable;