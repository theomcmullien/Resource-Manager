import { app, BrowserWindow } from 'electron';
import { ipcMainHandle, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
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
});
