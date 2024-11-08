import { app, BrowserWindow } from 'electron';
import path from 'path';
import { ipcHandle, isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { getStaticData, pollResource } from './resourceManager.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });

    if (isDev()) mainWindow.loadURL('http://localhost:5123');
    else mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));

    mainWindow.webContents.openDevTools();
    
    pollResource(mainWindow);

    ipcHandle('getStaticData', () => {
        return getStaticData();
    });
});
