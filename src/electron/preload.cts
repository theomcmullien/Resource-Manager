import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on('statistics', (event, stats) => {
            callback(stats);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
} satisfies Window['electron']);
