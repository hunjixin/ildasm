class ImportTable {
    constructor(reader, buffer, pEntity) {
        if (pEntity.sizeOfImportTable == 0) return;
        var offset = reader.peHeader.optionHeader.RVAToOffset(pEntity.importTable, reader.sectionHeaders);

        this.startOffset = offset;
        //指向IMAGE_THUNK_DATA 数组  int数组
        //数组每个指向IMAGE_IMPORT_BY_NAME  结构  由此读出函数名称
        this.originalFirstThunkOrTerninate = buffer.readUInt32LE(offset); // 包含指向IMAGE_DATA（输入名称表）RVA 的结构数组
        offset = offset + 4;
        this.timeDateStamp = buffer.readUInt32LE(offset); //当可执行文件不与被导入的DLL进行绑定时，此字段为0
        offset = offset + 4;
        this.forwarderChain = buffer.readUInt32LE(offset); //第一个被转向的API索引
        offset = offset + 4;
        this.dsadasdsad = buffer.readUInt32LE(offset); //第一个被转向的API索引
        offset = offset + 4;
        //dll 名称
        var name1Offset = reader.peHeader.optionHeader.RVAToOffset( this.dsadasdsad, reader.sectionHeaders);
        this.name =this.ReadName1(buffer,name1Offset);// buffer.toString('ascii', xxxx, 8); //指向被导入的DLL 名称

        this.firstThunk = buffer.readUInt32LE(offset); //指向输入地址表（IAT）RVA，IAT是一个IMAGE_THUNK_DATA结构的数组
        offset = offset + 4;

        this.length = offset - this.startOffset;

    }
    ReadName1(buffer,offset){
        var result="";
        while(true){
            var charCode= buffer.readInt8(offset);
            offset=offset+1;
            if(charCode==0) return result;
            result+=String.fromCharCode(charCode);
        }
    }
}

export default ImportTable;
module.exports.ImportTable = ImportTable;