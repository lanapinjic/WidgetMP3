import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    openSpotify: () => ipcRenderer.invoke('open-spotify')
});