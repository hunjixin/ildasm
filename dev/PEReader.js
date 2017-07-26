import events from 'events'
import fs from 'fs'

class DosHeader {
  constructor (buffer) {
    this.offset = 0
    this.e_magic = buffer.toString('ascii', 0, 2)
    this.offset = this.offset + 2
    this.e_cblp = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_cp = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_crlc = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_cparhdr = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_minalloc = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_maxalloc = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_ss = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_sp = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_csum = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_ip = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 16
    this.e_cs = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_lfarlc = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_ovno = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_res = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_oemic = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_oemidnfo = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_res2 = buffer.readUInt16LE(this.offset)
    this.offset = this.offset + 2
    this.e_lfanew = buffer.readUInt32LE(this.offset)
    this.offset = this.offset + 2
    this.length =  this.offset
    this.startOffset = this.offset
  }
}

class FileHeader {
  constructor (buffer, offset) {
    let startOffset = offset
    this.macine = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfSections = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.timeDateStamp = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.poUInterToSymbolTable = buffer.readUInt32LE(offset)
    offset = offset +4
    this.numberOfSymbols = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfOptionHeader = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.characteristics = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.length = offset - startOffset
    this.startOffset = offset
  }
}

class OptionalHeader {
  constructor (buffer, offset) {
    let startOffset = offset
    this.magic = buffer.readUInt16LE()
    offset = offset + 2
    this.majorLinkerVersion = buffer.readUInt8()
    offset = offset + 1
    this.minorLinkerVersion = buffer.readUInt8()
    offset = offset + 1
    this.sizeOfCode = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfInitializedData = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfUninitializedData = buffer.readUInt32LE()
    offset = offset + 4
    this.addressOfEntryPoUInt = buffer.readUInt32LE()
    offset = offset + 4

    this.baseOfCode = buffer.readUInt32LE()
    offset = offset + 4
    this.baseOfData = buffer.readUInt32LE()
    offset = offset + 4
    this.ImageBase = buffer.readUInt32LE()
    offset = offset + 4
    this.sectionAlignment = buffer.readUInt32LE()
    offset = offset + 4
    this.fileAlignment = buffer.readUInt32LE()
    offset = offset + 4

    this.majorOperatingSystemVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.minorOpratingSystemVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.majorImageVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.minorImageVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.majorSubSystemVersion = buffer.readUInt16LE()
    offset = offset + 2
    this.minorSubSystemVersion = buffer.readUInt16LE()
    offset = offset + 2

    this.win32VersionValue = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfImage = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfHeaders = buffer.readUInt32LE()
    offset = offset + 4
    this.checkSUm = buffer.readUInt32LE()
    offset = offset + 4

    this.sumsystem = buffer.readUInt16LE()
    offset = offset + 2
    this.dllCharacteristics = buffer.readUInt16LE()
    offset = offset + 2

    this.sizeOfStackReserve = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfStackCommit = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfHeapReserve = buffer.readUInt32LE()
    offset = offset + 4
    this.sizeOfHeadpCommit = buffer.readUInt32LE()
    offset = offset + 4
    this.loaderFlags = buffer.readUInt32LE()
    offset = offset + 4
    this.numberOfRvaAndSizes = buffer.readUInt32LE()
    offset = offset + 4
    this.dataDirectory = buffer.readUInt32LE()
    offset = offset + 4
    this.length = offset - startOffset
    this.startOffset = offset
  }
}

class PEHeader {
  constructor (buffer, offset,stubLen) {
    this.stub = buffer.toString('ascii', offset, stubLen)
    this.signature = buffer.readUInt32LE(offset)
    offset = offset + 32
    this.fileHeader = new FileHeader(buffer, offset)
    this.optionHeader = new OptionalHeader(buffer, offset)
    this.length = 32 + this.fileHeader.length + this.optionHeader.length
    this.startOffset = offset
  }
}

class PEReader {
  constructor (filePath) {
    this.filePath = filePath
    this.buffer = fs.readFileSync(filePath)
    this.dosHeader = new DosHeader(this.buffer)
    var stubLen= this.dosHeader.length + this.dosHeader.offset/8
    this.peHeader = new PEHeader(this.buffer, this.dosHeader.length,stubLen)
  }
}

export default PEReader
module.exports.PEReader = PEReader

export { DosHeader, FileHeader, OptionalHeader, PEHeader, PEReader }
