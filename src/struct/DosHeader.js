/**
 * dosheader
 */
class DosHeader {
    constructor(buffer) {
        this.startOffset = 0;
        var offset = 0;
        this.e_magic = buffer.toString('ascii', 0, 2);
        offset = offset + 2;
        this.e_cblp = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_cp = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_crlc = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_cparhdr = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_minalloc = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_maxalloc = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_ss = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_sp = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_csum = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_ip = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_cs = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_lfarlc = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_ovno = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_res = [];
        for (var i = 0; i < 4; i++) {
            this.e_res.push(buffer.readUInt16LE(offset));
            offset = offset + 2;
        }
        this.e_oemic = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_oemidnfo = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.e_res2 = [];
        for (var i = 0; i < 10; i++) {
            this.e_res2.push(buffer.readUInt16LE(offset));
            offset = offset + 2;
        }
        this.e_lfanew = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.length = offset;
    }
}


export default DosHeader;
module.exports.DosHeader = DosHeader;