import events from 'events'
import fs from 'fs'
/**
 * dosheader
 */
class DosHeader {
  constructor (buffer) {
    this.startOffset = 0
    var offset = 0
    this.e_magic = buffer.toString('ascii', 0, 2)
    offset = offset + 2
    this.e_cblp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_cp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_crlc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_cparhdr = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_minalloc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_maxalloc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ss = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_sp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_csum = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ip = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_cs = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_lfarlc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ovno = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_res = []
    for (var i = 0;i < 4;i++) {
      this.e_res.push(buffer.readUInt16LE(offset))
      offset = offset + 2
    }
    this.e_oemic = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_oemidnfo = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_res2 = []
    for (var i = 0;i < 10;i++) {
      this.e_res2.push(buffer.readUInt16LE(offset))
      offset = offset + 2
    }
    this.e_lfanew = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.length = offset
  }
}
/**
 * coffHeader
 */
class COFFHeader {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.machine = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.numberOfSections = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.timeDateStamp = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.poUInterToSymbolTable = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfSymbols = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfOptionHeader = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.characteristics = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.length = offset - this.startOffset
  }
  isX64 () {
    return this.machine == 'x64'
  }
}
/**
 * optionalHeader
 */
class OptionalHeader {
  constructor (buffer, offset, coffheader) {
    this.startOffset = offset
    this.signature = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorLinkerVersion = buffer.readUInt8(offset)
    offset = offset + 1
    this.minorLinkerVersion = buffer.readUInt8(offset)
    offset = offset + 1
    this.sizeOfCode = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfInitializedData = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfUninitializedData = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.addressOfEntryPoint = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.baseOfCode = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.baseOfData = buffer.readUInt32LE(offset)
    offset = offset + 4
    /*The next 21 fields are an extension to the COFF optional header format*/
    if (coffheader.isX64()) {
      this.imageBase = buffer.readUInt64LE(offset)
      offset = offset + 8
    }else {
      this.imageBase = buffer.readUInt32LE(offset)
      offset = offset + 4
    }

    this.sectionAlignment = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.fileAlignment = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.majorOperatingSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorOpratingSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorImageVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorImageVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorSubSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorSubSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2

    this.win32VersionValue = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfImage = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfHeaders = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.checkSUm = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.sumsystem = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.dllCharacteristics = buffer.readUInt16LE(offset)
    offset = offset + 2

    if (coffheader.isX64()) {
      this.sizeOfStackReserve = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfStackCommit = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfHeapReserve = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfHeadCommit = buffer.readUInt64LE(offset)
      offset = offset + 8
    }else {
      this.sizeOfStackReserve = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfStackCommit = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfHeapReserve = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfHeadCommit = buffer.readUInt32LE(offset)
      offset = offset + 4
    }

    this.loaderFlags = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfRvaAndSizes = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.dataDirectory = []
    offset = this.readDataDirectory(buffer, offset)
    this.length = offset - this.startOffset
  }
  readDataDirectory (buffer, offset) {
    var virtualAddress
    var size = buffer
    var innerReader = () => {
      virtualAddress = buffer.readUInt32LE(offset)
      offset = offset + 4
      size = buffer.readUInt32LE(offset)
      offset = offset + 4
    }
    // exportTable
    innerReader()
    this.dataDirectory.push({exportTable: virtualAddress,sizeOfExportTable: size})
    // importTable
    innerReader()
    this.dataDirectory.push({importTable: virtualAddress,sizeOfImportTable: size})
    // resourceTable
    innerReader()
    this.dataDirectory.push({resourceTable: virtualAddress,sizeOfResourceTable: size})
    // exceptionTable
    innerReader()
    this.dataDirectory.push({exceptionTable: virtualAddress,sizeOfExceptionTable: size})
    // CertificateTable
    innerReader()
    this.dataDirectory.push({certificateTable: virtualAddress,sizeOfCertificateTable: size})
    // BaseRelocationTable
    innerReader()
    this.dataDirectory.push({baseRelocationTable: virtualAddress,sizeOfBaseRelocationTable: size})
    // Debug
    innerReader()
    this.dataDirectory.push({debug: virtualAddress,sizeOfDebug: size})
    // ArchitectureData
    innerReader()
    this.dataDirectory.push({architectureData: virtualAddress,sizeOfArchitectureData: size})
    // GlobalPtr
    innerReader()
    this.dataDirectory.push({globalPtr: virtualAddress,sizeOfGlobalPtr: size})
    // TLSTable
    innerReader()
    this.dataDirectory.push({TLSTable: virtualAddress,sizeOfTLSTable: size})
    // loadConfigTable
    innerReader()
    this.dataDirectory.push({loadConfigTable: virtualAddress,sizeOfLoadConfigTable: size})
    // BoundImport
    innerReader()
    this.dataDirectory.push({boundImport: virtualAddress,sizeOfBoundImport: size})
    // ImportAddressTable
    innerReader()
    this.dataDirectory.push({importAddressTable: virtualAddress,sizeOfImportAddressTable: size})
    // DelayImportDescriptor
    innerReader()
    this.dataDirectory.push({delayImportDescriptor: virtualAddress,sizeOfDelayImportDescriptor: size})
    // CLRRuntimeHeader
    innerReader()
    this.dataDirectory.push({CLRRuntimeHeader: virtualAddress,sizeOfCLRRuntimeHeader: size})
    // reserve
    innerReader()
    this.dataDirectory.push({reserve: virtualAddress,sizeOfreserve: size})
    return offset
  }
}
/**
 * peHeader
 */
class PEHeader {
  constructor (buffer, offset) {
    this.startOffset = offset

    this.signature = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.coffHeader = new COFFHeader(buffer, offset)
    offset = offset + this.coffHeader.length

    this.optionHeader = new OptionalHeader(buffer, offset, this.coffHeader)
    offset = offset + this.optionHeader.length

    this.length = offset - this.startOffset
  }
}
/**
 * sectionHeader
 */
class SectionHeader {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.name = buffer.toString('ascii', offset, offset + 8)
    offset = offset + 8
    this.misc = buffer.readUInt32LE() // PhysicalAddress;  VirtualSize
    offset = offset + 4

    this.virtualAddress = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfRawData = buffer.readUInt32LE()
    offset = offset + 4
    this.pointerToRawData = buffer.readUInt32LE()
    offset = offset + 4
    this.pointerToRelocations = buffer.readUInt32LE()
    offset = offset + 4
    this.pointerToLinenumbers = buffer.readUInt32LE()
    offset = offset + 4

    this.numberOfRelocations = buffer.readUInt16LE()
    offset = offset + 2
    this.numberOfLinenumbers = buffer.readUInt16LE()
    offset = offset + 2
    this.characteristics = buffer.readUInt32LE()
    offset = offset + 4
    this.length = offset - this.startOffset
  }
}
// export

class ExportTable {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.characteristics = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.timeDataStamp = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.majorVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorVersion = buffer.readUInt16LE(offset)
    offset = offset + 2

    this.name = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.base = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.numberOfFunctions = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfNames = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.addressOfFunctions = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.addressOfNames = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.addressOfNameOrDinals = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.length = offset - this.startOffset
  }
}
class ImportTable {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.originalFirstThunk = buffer.readUInt32LE(offset) // ImportByName
    offset = offset + 4
    this.timeDateStamp = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.forwarderChain = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.name = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.firstThunk = buffer.readUInt32LE(offset) // ImportByName
    offset = offset + 4
    this.length = offset - this.startOffset
  }
}

class ImportByName {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.hint = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.name = buffer.toString('ascii', offset, 1)
    offset = offset + 1
    this.length = offset - this.startOffset
  }
}

class ResourceTable {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.charachteristics = buffer.readUInt32LE()
    offset = offset + 4
    this.timeDateStamp = buffer.readUInt32LE()
    offset = offset + 4
    this.majorVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.minorVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.numberOfNameEntries = buffer.readUInt16LE()
    offset = offset + 2
    this.numberOfIdEntries = buffer.readUInt16LE()
    offset = offset + 2
    this.nameEntries = [ ]
      for (var i = 0;i < this.numberOfNameEntries;i++) {
        var entry = new resourceEntry(buffer, offset)
        offset = offset + entry.length
        this.nameEntries.push(entry)
      }
      this.idEntries = [ ]
        for (var i = 0;i < this.numberOfIdEntries;i++) {
          var entry = new resourceEntry(buffer, offset)
          offset = offset + entry.length
          this.idEntries.push(entry)
        }
        this.length = offset - this.startOffset
      }
    }

    class resourceEntry {
      constructor (buffer, offset) {
        this.startOffset = offset
        this.namedId = buffer.readUInt32LE()
        offset = offset + 4
        this.data = buffer.readUInt32LE()
        offset = offset + 4
        this.length = offset - this.startOffset

        this.dataDetail = new resourceDataEntry(buffer, this.data)
      }
    }

    class resourceDataEntry {
      constructor (buffer, offset) {
        this.startOffset = offset
        this.data = buffer.readUInt32LE()
        offset = offset + 4
        this.size = buffer.readUInt32LE()
        offset = offset + 4
        this.codePage = buffer.readUInt32LE()
        offset = offset + 4
        this.reserved = buffer.readUInt32LE()
        offset = offset + 4
        this.length = offset - this.startOffset
      }
    }

    class ExceptionTable {
      constructor (buffer, offset) {
        this.startOffset = offset
        this.pData = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.length = offset - this.startOffset
      }
    }

    class SecurityTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class BaserelocTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class DebugTable {
      constructor (buffer, offset) {
        this.startOffset = offset
        this.characteristics = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.timeDataStamp = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.majorVersion = buffer.readUInt16LE(offset)
        offset = offset + 2
        this.minorVersion = buffer.readUInt16LE(offset)
        offset = offset + 2

        this.type = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.sizeOfData = buffer.readUInt32LE(offset)
        offset = offset + 4

        this.addressOfRawData = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.pointerToRawData = buffer.readUInt32LE(offset)
        offset = offset + 4
        this.length = offset - this.startOffset
      }
    }

    class ArchitectureTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }
    class GlobalptrTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class TLSTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class LoadConfigTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class BoundImportTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class IatTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class DelayImportTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class ComDescriptionTable {
      constructor (buffer, offset) {
        this.startOffset = offset

        this.length = offset - this.startOffset
      }
    }

    class PEReader {
      constructor (filePath) {
        var buffer = fs.readFileSync(filePath)
        // header imformation
        this.dosHeader = new DosHeader(buffer)
        this.dosStub = buffer.toString('ascii', this.dosHeader.length, this.dosHeader.e_lfanew) // 64

        this.peHeader = new PEHeader(buffer, this.dosHeader.e_lfanew)
        this.sectionHeaders = []
        var offset = this.peHeader.startOffset + this.peHeader.length
        for (var i = 0;i < this.peHeader.coffHeader.numberOfSections;i++) {
          var section = new SectionHeader(buffer, offset)
          this.sectionHeaders.push(section)
          offset = offset + section.length
        }
        // export
        if (this.peHeader.optionHeader.dataDirectory.exportTable != 0)
          this.exportTable = new ExportTable(buffer, this.peHeader.optionHeader.dataDirectory.exportTable)
        // import
        if (this.peHeader.optionHeader.dataDirectory.importTable != 0)
          this.importTable = new ImportTable(buffer, this.peHeader.optionHeader.dataDirectory.importTable)
        // resource
        if (this.peHeader.optionHeader.dataDirectory.resourceTable != 0)
          this.resourceTable = new ResourceTable(buffer, this.peHeader.optionHeader.dataDirectory.resourceTable)
        // exception
        if (this.peHeader.optionHeader.dataDirectory.exceptionTable != 0)
          this.exceptionTable = new ExceptionTable(buffer, this.peHeader.optionHeader.dataDirectory.exceptionTable)
        // security
        if (this.peHeader.optionHeader.dataDirectory.certificateTable != 0)
          this.certificateTable = new SecurityTable(buffer, this.peHeader.optionHeader.dataDirectory.certificateTable)
        // baserloc
        if (this.peHeader.optionHeader.dataDirectory.resourceTable != 0)
          this.resourceTable = new ResourceTable(buffer, this.peHeader.optionHeader.dataDirectory.resourceTable)
        // debug
        if (this.peHeader.optionHeader.dataDirectory.debugTable != 0)
          this.debugTable = new DebugTable(buffer, this.peHeader.optionHeader.dataDirectory.debugTable)
        // architecture
        if (this.peHeader.optionHeader.dataDirectory.architectureData != 0)
          this.architectureDataTable = new ArchitectureTable(buffer, this.peHeader.optionHeader.dataDirectory.architectureData)
        // globalptr
        if (this.peHeader.optionHeader.dataDirectory.globalPtr != 0)
          this.globalPtr = new GlobalptrTable(buffer, this.peHeader.optionHeader.dataDirectory.globalPtr)
        // tls
        if (this.peHeader.optionHeader.dataDirectory.TLSTable != 0)
          this.TLSTable = new TLSTable(buffer, this.peHeader.optionHeader.dataDirectory.TLSTable)
        // load_config
        if (this.peHeader.optionHeader.dataDirectory.loadConfigTable != 0)
          this.loadConfigTable = new LoadConfigTable(buffer, this.peHeader.optionHeader.dataDirectory.loadConfigTable)
        // bound_import
        if (this.peHeader.optionHeader.dataDirectory.boundImport != 0)
          this.boundImportTable = new BoundImportTable(buffer, this.peHeader.optionHeader.dataDirectory.boundImport)
        // iat
        if (this.peHeader.optionHeader.dataDirectory.importAddressTable != 0)
          this.importAddressTable = new IatTable(buffer, this.peHeader.optionHeader.dataDirectory.importAddressTable)
        // delatimport
        if (this.peHeader.optionHeader.dataDirectory.delayImportDescriptor != 0)
          this.delayImportTable = new DelayImportTable(buffer, this.peHeader.optionHeader.dataDirectory.delayImportDescriptor)
        // comdescriptor
        if (this.peHeader.optionHeader.dataDirectory.CLRRuntimeHeader != 0)
          this.CLRRuntimeHeader = new ComDescriptionTable(buffer, this.peHeader.optionHeader.dataDirectory.CLRRuntimeHeader)
      }
    }

    export default PEReader
    module.exports.PEReader = PEReader

    export { DosHeader, COFFHeader, OptionalHeader, PEHeader, PEReader, SectionHeader }
