import { app, BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';
import { getAssetsPath } from './pathResolver.js';

export function createTray(mainWindow: BrowserWindow) {
    const tray = new Tray(path.join(getAssetsPath(), process.platform === 'darwin' ? 'icons/tray_iconTemplate@2x.png' : 'icons/tray_icon@2x.png'));

    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Show',
                click: () => {
                    mainWindow.show();
                    if (app.dock) app.dock.show(); //macOS
                },
            },
            { label: 'Quit', click: app.quit },
        ])
    );
}
