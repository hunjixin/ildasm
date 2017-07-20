import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'
import url from 'url'
import fs from 'fs'
import { template } from './MenuTemplate.js'
let mainWindow

app.on('ready', () => {
  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
  
function createWindow () {
  mainWindow = new BrowserWindow({ width: 800,  height: 600,  icon: 'images/sd.icon'})
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname:process.cwd()+'pub/index.html',
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => {
    mainWindow = null})
}
