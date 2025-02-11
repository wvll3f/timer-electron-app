import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    frame: false,
    resizable:false,
    alwaysOnTop: true,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: true,
    roundedCorners: true,
    width: 300,
    height: 150,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  ipcMain.on('close-app', () => {
    app.quit();
  });

  ipcMain.on('open-external-site', () => {
    shell.openExternal('https://wallefamorim.netlify.app/')
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
  mainWindow.on('blur', () => {
    mainWindow.setOpacity(0.3);
  });
  mainWindow.on('focus', () => {
    mainWindow.setOpacity(1);
  });
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
