const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => ipcRendererOn('statistics', (stats) => callback(stats)),
    getStaticData: () => ipcRendererInvoke('getStaticData'),
    subscribeChangeView: (callback) => ipcRendererOn('changeView', (view) => callback(view)),
} satisfies Window['electron']);

// frontend adapters (type safe)
function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(key: Key): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcRendererOn<Key extends keyof EventPayloadMapping>(key: Key, callback: (payload: EventPayloadMapping[Key]) => void) {
    const cb = (event: Electron.IpcRendererEvent, payload: any) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

function ipcRendererSend<Key extends keyof EventPayloadMapping>(key: Key, payload: EventPayloadMapping[Key]) {
    electron.ipcRenderer.send(key, payload);
}
