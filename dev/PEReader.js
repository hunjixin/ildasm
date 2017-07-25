import events from 'events'
import fs from 'fs'

class DosHeader {
  constructor (buffer) {
    this.e_magic = buffer.toString('ascii', 0, 16)
    this.e_cblp = buffer.readUInt16BE()
    this.e_cp = buffer.readUInt16BE()
    this.e_crlc = buffer.readUInt16BE()
    this.e_cparhdr = buffer.readUInt16BE()
    this.e_minalloc = buffer.readUInt16BE()
    this.e_maxalloc = buffer.readUInt16BE()
    this.e_ss = buffer.readUInt16BE()
    this.e_sp = buffer.readUInt16BE()
    this.e_csum = buffer.readUInt16BE()
    this.e_ip = buffer.readUInt16BE()
    this.e_cs = buffer.readUInt16BE()
    this.e_lfarlc = buffer.readUInt16BE()
    this.e_ovno = buffer.readUInt16BE()
    this.e_res = buffer.readUInt16BE()
    this.e_oemic = buffer.readUInt16BE()
    this.e_oemidnfo = buffer.readUInt16BE()
    this.e_res2 = buffer.readUInt16BE()
    this.e_lfanew = buffer.readUInt32BE()
  }
}

class DosStub {
  constructor (buffer, startIndex, endIndex) {
    this.msg = buffer.toString('ascii', startIndex, endIndex)
  }
}

class FileHeader {
  constructor (buffer) {
    this.macine = buffer.readUInt32BE()
    this.numberOfSections = buffer.readUInt16BE()
    this.timeDateStamp = buffer.readUInt32BE()
    this.poUInterToSymbolTable = buffer.readUInt32BE()
    this.numberOfSymbols = buffer.readUInt32BE()
    this.sizeOfOptionHeader = buffer.readUInt32BE()
    this.characteristics = buffer.readUInt32BE()
  }
}

class OptionalHeader {
  constructor (buffer) {
    this.magic = buffer.readUInt16BE()
    this.majorLinkerVersion = buffer.readUInt8()
    this.minorLinkerVersion = buffer.readUInt8()
    this.sizeOfCode = buffer.readUInt32BE()
    this.sizeOfInitializedData = buffer.readUInt32BE()
    this.sizeOfUninitializedData = buffer.readUInt32BE()
    this.addressOfEntryPoUInt = buffer.readUInt32BE()

    this.baseOfCode = buffer.readUInt32BE()
    this.baseOfData = buffer.readUInt32BE()
    this.ImageBase = buffer.readUInt32BE()
    this.sectionAlignment = buffer.readUInt32BE()
    this.fileAlignment = buffer.readUInt32BE()

    this.majorOperatingSystemVersion = buffer.readUInt16BE()
    this.minorOpratingSystemVersion = buffer.readUInt16BE()
    this.majorImageVersion = buffer.readUInt16BE()
    this.minorImageVersion = buffer.readUInt16BE()
    this.majorSubSystemVersion = buffer.readUInt16BE()
    this.minorSubSystemVersion = buffer.readUInt16BE()

    this.win32VersionValue = buffer.readUInt32BE()
    this.sizeOfImage = buffer.readUInt32BE()
    this.sizeOfHeaders = buffer.readUInt32BE()
    this.checkSUm = buffer.readUInt32BE()

    this.sumsystem = buffer.readUInt16BE()
    this.dllCharacteristics = buffer.readUInt16BE()

    this.sizeOfStackReserve = buffer.readUInt32BE()
    this.sizeOfStackCommit=buffer.readUInt32BE()
    this,sizeOfHeapReserve=buffer.readUInt32BE()
    this.sizeOfHeadpCommit = buffer.readUInt32BE()
    this.loaderFlags = buffer.readUInt32BE()
    this.numberOfRvaAndSizes = buffer.readUInt32BE()
    this.dataDirectory = buffer.readUInt32BE()
  }
}

class PEHeader {
  constructor (buffer) {
    this.signature = buffer.readUInt32BE()
    this.fileHeader = new FileHeader(buffer)
    this.optionHeader=new OptionalHeader(buffer)
  }
}

class PEReader {
  constructor (filePath) {
    this.filePath = filePath
    this.buffer = fs.readFileSync(filePath)
  }
}

export default PEReader
module.exports.EmitManager = PEReader
