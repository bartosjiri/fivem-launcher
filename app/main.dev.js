/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

import {spawn, exec, execFile, fork} from "child_process";
import fs from "fs";

import fivemLocationParser from "./utils/parsers/fivemLocationParser";

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */
const instanceLock = app.requestSingleInstanceLock();
if (!instanceLock) {
  app.quit()
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 680,
    backgroundColor: "#27135c",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    resizable: false // @TODO: Until window max/unmax is fixed
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow.removeAllListeners();
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  ipcMain.on('mainprocess_action', (event, data) => {
    if (data.action === "app_restart") {
      autoUpdater.quitAndInstall();
    }
    if (data.action === "fivem_process") {
      if (/(FiveM.exe)$/.test(data.payload.command)) {
        const fivemURL = fivemLocationParser(data.payload.command);
        fs.access(fivemURL, fs.F_OK, (err) => {
          if (err) {
            sendStatusToWindow('fivem_invalid', 'Invalid FiveM location.');
            return
          }

          // const fivemProcess = spawn(
          //   `"${data.payload.command}"`,
          //   data.payload.arguments,
          //   {shell: true}
          // );

          const fivemProcess = spawn(
            "cmd.exe",
            [`${data.payload.command} +connect ${data.payload.path}`],
            {shell: true}
            // {}
          );

          // const fivemProcess = spawn(
          //   // "cmd.exe",
          //   data.payload.command,
          //   // [`${data.payload.command} +connect ${data.payload.path}`],
          //   [],
          //   {
          //     // detached: true,
          //     // stdio: [ 'ignore', 'ignore', 'ignore' ]
          //   }
          // );

        })
      } else {
        sendStatusToWindow('fivem_invalid', 'Invalid FiveM location.');
      }
    }
  });

  const sendStatusToWindow = (status, message) => {
    if (mainWindow) {
      mainWindow.webContents.send('status', {status, message});
    }
  };

  mainWindow.on('focus', () => {
    sendStatusToWindow('window_focus', "Window gained focus.");
  });

  mainWindow.on('blur', () => {
    sendStatusToWindow('window_blur', "Window lost focus.");
  });

  // autoUpdater.on('checking-for-update', () => {
  //   sendStatusToWindow('update_checking', 'Checking for update...'); // @DEBUG
  // });

  // autoUpdater.on('update-available', info => {
  //   sendStatusToWindow('update_available', 'Update available.'); // @DEBUG
  // });

  // autoUpdater.on('update-not-available', info => {
  //   sendStatusToWindow('update_notAvailable', 'Update not available.'); // @DEBUG
  // });

  // autoUpdater.on('error', err => {
  //   sendStatusToWindow('update_error', `Error in auto-updater: ${err.toString()}`); // @DEBUG
  // });

  // autoUpdater.on('download-progress', progressObj => {
  //   sendStatusToWindow('update_progress', `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`); // @DEBUG
  // });

  autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow('update_progress', `Downloading update (${Math.round(progressObj.percent)}%)`);
  });

  autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('update_downloaded', 'Update downloaded; will install on restart.');
  });

  // mainWindow.webContents.openDevTools(); // @DEBUG: Enables DevTools in production
});
