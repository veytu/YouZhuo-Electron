const electron = require('electron');
const path = require('path');

const startUrl =
  process.env.ELECTRON_START_URL ||
  `file://${path.resolve(__dirname, '../../app.asar/build')}/index.html`;

const realSize = {
  width: 1366,
  height: 768,
};

// workaround for resizable issue in mac os
const os = require('os');
const platform = os.platform();
// Menu template
const isMac = platform === 'darwin';

// Module to control application life.
const { app, Menu, ipcMain, BrowserWindow } = electron;

const createMainWindow = function () {
  const _mainWindow = new BrowserWindow({
    frame: true,
    width: realSize.width,
    height: realSize.height,
    center: true,
    resizable: true,
    // alex-tag-main-window-config
    fullscreen: true,
    // fullscreen: false,// Whether the window should show in fullscreen. When explicitly set to false the fullscreen button will be hidden or disabled on macOS. Default is false.

    // show: true,
    webPreferences: {
      autoplayPolicy: 'no-user-gesture-required',
      nodeIntegration: true,
      contextIsolation: false,
      // preload: runtime.preloadPath,
      webSecurity: false,
      webviewTag: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      backgroundThrottling: false,
    },
  });

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  mainWindow.current = _mainWindow;

  _mainWindow.setAspectRatio(16 / 9, realSize);

  _mainWindow.center();
  // and load the index.html of the app.
  _mainWindow.loadURL(startUrl);

  const filter = {
    urls: ['file:///*/index.html*'],
  };

  const requestCallback = (details, callback) => {
    if (details.url.includes('accessToken') && details.url.includes('refreshToken')) {
      const originParams = new URLSearchParams(details.url.split('?')[1]);
      const newParams = new URLSearchParams({
        at: originParams.get('accessToken'),
        rt: originParams.get('refreshToken'),
      });
      const htmlPath = details.url.split('?')[0];
      const url = `${htmlPath}?${newParams.toString()}`;
      _mainWindow.loadURL(url);
      callback({ cancel: true });
    } else {
      callback({ cancel: false });
    }
  };

  _mainWindow.webContents.session.webRequest.onBeforeRequest(filter, requestCallback);
  _mainWindow.webContents.openDevTools();  // 打开开发者工具

  const appLogPath = app.getPath('logs');

  const logPath = path.join(appLogPath, `log`, `agora_sdk.log`);
  const dstPath = path.join(appLogPath, `log`, `agora_sdk.log.zip`);

  // Emitted when the window is closed.
  _mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow === _mainWindow) {
      mainWindow.current = null;
    }
  });

  _mainWindow.once('ready-to-show', () => {
    _mainWindow.show();
  });

  // TODO: electron menu template
  // More details please see: https://www.electronjs.org/docs/api/menu#menubuildfromtemplatetemplate
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              // { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
          : [{ role: 'close' }]),
      ],
    },
    {
      label: 'Log',
      submenu: [
        {
          label: 'export log',
          click: async () => {
            _mainWindow.webContents.send('export-log', [logPath, dstPath]);
          },
        },
      ],
    },
    {
      label: 'About Agora',
      submenu: [
        {
          label: 'more info',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://www.agora.io');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  if (platform === 'darwin') {
    _mainWindow.excludedFromShownWindowsMenu = true;
    Menu.setApplicationMenu(menu);
  }

  if (platform === 'win32') {
    //_mainWindow.setMenu(menu);
    _mainWindow.setMenu(null);
  }

  ipcMain.on('close', () => {
    const currentWindow = BrowserWindow.getFocusedWindow() || _mainWindow;
    if (currentWindow === _mainWindow) {
      app.quit();
      return;
    }
  });
};

const mainWindow = {
  current: null,
};

module.exports = {
  createMainWindow,
  mainWindow,
  startUrl,
};
