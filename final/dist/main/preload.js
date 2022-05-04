"use strict";
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    changePage: function (callback) { return electron_1.ipcRenderer.on('change-page', callback); },
    writeLEDStatus: function (value) {
        electron_1.ipcRenderer.invoke('write:LEDStatus', value);
    }
});
//# sourceMappingURL=preload.js.map