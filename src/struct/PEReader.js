import events from 'events';
import fs from 'fs';

import  {DosHeader} from './DosHeader.js';
import  {PEHeader} from './PEHeader.js';
import  {SectionHeader} from './SectionHeader.js';

import {
  ExportTable,ImportTable,ResourceTable,ExceptionTable,SecurityTable,
  BaserelocTable,DebugTable, ArchitectureTable,GlobalptrTable,TLSTable,
  LoadConfigTable,BoundImportTable,IatTable,DelayImportTable,ComDescriptionTable,
} from './data_directory/index.js';


class PEReader {
  parserFile(filePath) {
    var buffer = fs.readFileSync(filePath);
    // header imformation
    this.dosHeader = new DosHeader(buffer);
    this.dosStub = buffer.toString('ascii', this.dosHeader.length, this.dosHeader.e_lfanew); // 64

    this.peHeader = new PEHeader(buffer, this.dosHeader.e_lfanew);
    this.sectionHeaders = []
    var offset = this.peHeader.startOffset + this.peHeader.length;
    for (var i = 0; i < this.peHeader.coffHeader.numberOfSections; i++) {
      var section = new SectionHeader(buffer, offset);
      this.sectionHeaders.push(section);
      offset = offset + section.length;
    }
    // export
    if (this.peHeader.optionHeader.dataDirectory.exportTable != 0)
      this.exportTable = new ExportTable(buffer, this.peHeader.optionHeader.dataDirectory.exportTable);
    // import
    if (this.peHeader.optionHeader.dataDirectory.importTable != 0)
      this.importTable = new ImportTable(buffer, this.peHeader.optionHeader.dataDirectory.importTable);
    // resource
    if (this.peHeader.optionHeader.dataDirectory.resourceTable != 0)
      this.resourceTable = new ResourceTable(buffer, this.peHeader.optionHeader.dataDirectory.resourceTable);
    // exception
    if (this.peHeader.optionHeader.dataDirectory.exceptionTable != 0)
      this.exceptionTable = new ExceptionTable(buffer, this.peHeader.optionHeader.dataDirectory.exceptionTable);
    // security
    if (this.peHeader.optionHeader.dataDirectory.certificateTable != 0)
      this.certificateTable = new SecurityTable(buffer, this.peHeader.optionHeader.dataDirectory.certificateTable);
    // baserloc
    if (this.peHeader.optionHeader.dataDirectory.baserloc != 0)
      this.BaserelocTable = new BaserelocTable(buffer, this.peHeader.optionHeader.dataDirectory.resourceTable);
    // debug
    if (this.peHeader.optionHeader.dataDirectory.debugTable != 0)
      this.debugTable = new DebugTable(buffer, this.peHeader.optionHeader.dataDirectory.debugTable);
    // architecture
    if (this.peHeader.optionHeader.dataDirectory.architectureData != 0)
      this.architectureDataTable = new ArchitectureTable(buffer, this.peHeader.optionHeader.dataDirectory.architectureData);
    // globalptr
    if (this.peHeader.optionHeader.dataDirectory.globalPtr != 0)
      this.globalPtr = new GlobalptrTable(buffer, this.peHeader.optionHeader.dataDirectory.globalPtr);
    // tls
    if (this.peHeader.optionHeader.dataDirectory.TLSTable != 0)
      this.TLSTable = new TLSTable(buffer, this.peHeader.optionHeader.dataDirectory.TLSTable);
    // load_config
    if (this.peHeader.optionHeader.dataDirectory.loadConfigTable != 0)
      this.loadConfigTable = new LoadConfigTable(buffer, this.peHeader.optionHeader.dataDirectory.loadConfigTable);
    // bound_import
    if (this.peHeader.optionHeader.dataDirectory.boundImport != 0)
      this.boundImportTable = new BoundImportTable(buffer, this.peHeader.optionHeader.dataDirectory.boundImport);
    // iat
    if (this.peHeader.optionHeader.dataDirectory.importAddressTable != 0)
      this.importAddressTable = new IatTable(buffer, this.peHeader.optionHeader.dataDirectory.importAddressTable);
    // delatimport
    if (this.peHeader.optionHeader.dataDirectory.delayImportDescriptor != 0)
      this.delayImportTable = new DelayImportTable(buffer, this.peHeader.optionHeader.dataDirectory.delayImportDescriptor);
    // comdescriptor
    if (this.peHeader.optionHeader.dataDirectory.CLRRuntimeHeader != 0)
      this.CLRRuntimeHeader = new ComDescriptionTable(buffer, this.peHeader.optionHeader.dataDirectory.CLRRuntimeHeader);
  }
}

export default PEReader;
module.exports.PEReader = PEReader;