import events from 'events'
class EmitManager {

  constructor () {
    this.emitter = new events.EventEmitter()
  }

  BindMenuEvent (win) {
    this.windows = win
    this.emitter.on('openFile', (path) => {this._openFile(path)})
  }

  Trigger (eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }

  _openFile (fileName) {
    this.windows.setTitle(`${fileName}  IL DASM`)
    this.windows.webContents.send('readyParser', fileName);
  }
  
  AddRenderListenner(eventName,callback)
  {
    require('electron').ipcRenderer.on(eventName, callback);
  }
}
export default EmitManager
module.exports.EmitManager = EmitManager
