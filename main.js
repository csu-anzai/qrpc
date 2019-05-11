// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const prepareNext = require('electron-next')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const devPath = 'http://localhost:8000/start'
  const prodPath = path.resolve('renderer/out/start/index.html')
  const entry = isDev ? devPath : 'file://' + prodPath

  mainWindow.loadURL(entry)

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await prepareNext('./renderer')
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
