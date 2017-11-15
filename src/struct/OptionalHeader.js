/**
 * optionalHeader
 */
class OptionalHeader {
    constructor(buffer, offset, coffheader, dosHeader) {
        this.coffheader = coffheader;
        this.dosHeader = dosHeader;
        this.startOffset = offset;
        this.signature = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.majorLinkerVersion = buffer.readUInt8(offset);
        offset = offset + 1;
        this.minorLinkerVersion = buffer.readUInt8(offset);
        offset = offset + 1;
        this.sizeOfCode = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfInitializedData = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfUninitializedData = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.addressOfEntryPoint = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.baseOfCode = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.baseOfData = buffer.readUInt32LE(offset);
        offset = offset + 4;
        /*The next 21 fields are an extension to the COFF optional header format*/
        if (coffheader.isX64()) {
            this.imageBase = buffer.readUInt64LE(offset);
            offset = offset + 8;
        } else {
            this.imageBase = buffer.readUInt32LE(offset);
            offset = offset + 4;
        }

        this.sectionAlignment = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.fileAlignment = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.majorOperatingSystemVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.minorOpratingSystemVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.majorImageVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.minorImageVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.majorSubSystemVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.minorSubSystemVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;

        this.win32VersionValue = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfImage = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfHeaders = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.checkSUm = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.sumsystem = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.dllCharacteristics = buffer.readUInt16LE(offset);
        offset = offset + 2;

        if (coffheader.isX64()) {
            this.sizeOfStackReserve = buffer.readUInt64LE(offset);
            offset = offset + 8;
            this.sizeOfStackCommit = buffer.readUInt64LE(offset);
            offset = offset + 8;
            this.sizeOfHeapReserve = buffer.readUInt64LE(offset);
            offset = offset + 8;
            this.sizeOfHeadCommit = buffer.readUInt64LE(offset);
            offset = offset + 8;
        } else {
            this.sizeOfStackReserve = buffer.readUInt32LE(offset);
            offset = offset + 4;
            this.sizeOfStackCommit = buffer.readUInt32LE(offset)
            offset = offset + 4;
            this.sizeOfHeapReserve = buffer.readUInt32LE(offset);
            offset = offset + 4;
            this.sizeOfHeadCommit = buffer.readUInt32LE(offset);
            offset = offset + 4;
        }

        this.loaderFlags = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.numberOfRvaAndSizes = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.dataDirectory = [];
        offset = this.readDataDirectory(buffer, offset);
        this.length = offset - this.startOffset;


    }
    RVAToOffset(dwRva, sections) {
        //区段数  
        var dwSectionCount = this.coffheader.numberOfSections;
        //内存对齐大小  
        var dwAlignment = this.sectionAlignment;
        for (var i = 0; i < dwSectionCount; ++i) {
            var dwBegin = sections[i].virtualAddress;
            if (i == 0 && dwRva < dwBegin) {
                return {
                    foa: dwRva,
                    section: 0
                };
            }
            var dwBlockCount = sections[i].sizeOfRawData / dwAlignment;
            dwBlockCount += sections[i].sizeOfRawData % dwAlignment ? 1 : 0;
            if (dwRva >= dwBegin && dwRva < dwBegin + dwBlockCount * dwAlignment) {
                return {
                    foa: sections[i].pointerToRawData + dwRva - dwBegin,
                    section: i
                };
            }
        }
    }

    readDataDirectory(buffer, offset) {
        var virtualAddress;
        var size = buffer;
        var innerReader = () => {
            virtualAddress = buffer.readUInt32LE(offset);
            offset = offset + 4;
            size = buffer.readUInt32LE(offset);
            offset = offset + 4;
        }
        // exportTable
        innerReader();
        this.dataDirectory.push({
            exportTable: virtualAddress,
            sizeOfExportTable: size
        });
        // importTable
        innerReader();
        this.dataDirectory.push({
            importTable: virtualAddress,
            sizeOfImportTable: size
        });
        // resourceTable
        innerReader();
        this.dataDirectory.push({
            resourceTable: virtualAddress,
            sizeOfResourceTable: size
        });
        // exceptionTable
        innerReader();
        this.dataDirectory.push({
            exceptionTable: virtualAddress,
            sizeOfExceptionTable: size
        });
        // CertificateTable
        innerReader();
        this.dataDirectory.push({
            certificateTable: virtualAddress,
            sizeOfCertificateTable: size
        });
        // BaseRelocationTable
        innerReader();
        this.dataDirectory.push({
            baseRelocationTable: virtualAddress,
            sizeOfBaseRelocationTable: size
        });
        // Debug
        innerReader();
        this.dataDirectory.push({
            debug: virtualAddress,
            sizeOfDebug: size
        });
        // ArchitectureData
        innerReader();
        this.dataDirectory.push({
            architectureData: virtualAddress,
            sizeOfArchitectureData: size
        });
        // GlobalPtr
        innerReader();
        this.dataDirectory.push({
            globalPtr: virtualAddress,
            sizeOfGlobalPtr: size
        });
        // TLSTable
        innerReader();
        this.dataDirectory.push({
            TLSTable: virtualAddress,
            sizeOfTLSTable: size
        });
        // loadConfigTable
        innerReader();
        this.dataDirectory.push({
            loadConfigTable: virtualAddress,
            sizeOfLoadConfigTable: size
        });
        // BoundImport
        innerReader();
        this.dataDirectory.push({
            boundImport: virtualAddress,
            sizeOfBoundImport: size
        });
        // ImportAddressTable
        innerReader();
        this.dataDirectory.push({
            importAddressTable: virtualAddress,
            sizeOfImportAddressTable: size
        });
        // DelayImportDescriptor
        innerReader();
        this.dataDirectory.push({
            delayImportDescriptor: virtualAddress,
            sizeOfDelayImportDescriptor: size
        });
        // CLRRuntimeHeader
        innerReader();
        this.dataDirectory.push({
            CLRuntimeHeader: virtualAddress,
            sizeOfCLRRuntimeHeader: size
        });
        // reserve
        innerReader();
        this.dataDirectory.push({
            reserve: virtualAddress,
            sizeOfreserve: size
        });
        return offset;
    }
}

export default OptionalHeader;
module.exports.OptionalHeader = OptionalHeader;