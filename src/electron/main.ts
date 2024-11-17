import { app, BrowserWindow } from 'electron';
import { ipcMainHandle, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { getStaticData, pollResource } from './resourceManager.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';

// Menu.setApplicationMenu(null); //disable menu

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(getUIPath());
    }

    pollResource(mainWindow); //send data to window

    ipcMainHandle('getStaticData', () => {
        return getStaticData();
    });

    createTray(mainWindow);
    createMenu(mainWindow);
    handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
    let closing = false;

    mainWindow.on('close', (event) => {
        if (closing) return;
        event.preventDefault();
        mainWindow.hide();
        if (app.dock) app.dock.hide(); //macOS
    });

    app.on('before-quit', () => (closing = true));

    mainWindow.on('show', () => (closing = false));
}
