

/**
 * sectionHeader
 */
class SectionHeader {
    constructor(buffer, offset) {
        this.startOffset = offset;
        this.name = buffer.toString('ascii', offset, offset + 8);
        offset = offset + 8;
        this.misc = buffer.readUInt32LE(offset); // PhysicalAddress;  VirtualSize
        offset = offset + 4;

        this.virtualAddress = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfRawData = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.pointerToRawData = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.pointerToRelocations = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.pointerToLinenumbers = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.numberOfRelocations = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.numberOfLinenumbers = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.characteristics = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.length = offset - this.startOffset;
    }
}

export default SectionHeader;
module.exports.SectionHeader = SectionHeader;