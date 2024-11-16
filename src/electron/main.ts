import { app, BrowserWindow, Tray } from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { getAssetsPath, getPreloadPath, getUIPath } from './pathResolver.js';
import { getStaticData, pollResource } from './resourceManager.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });

    if (isDev()) mainWindow.loadURL('http://localhost:5123');
    else mainWindow.loadFile(getUIPath());

    mainWindow.webContents.openDevTools();

    pollResource(mainWindow);

    ipcMainHandle('getStaticData', () => {
        return getStaticData();
    });

    new Tray(path.join(getAssetsPath(), process.platform === 'darwin' ? 'icons/tray_iconTemplate.png' : 'icons/tray_icon.png'));
});
