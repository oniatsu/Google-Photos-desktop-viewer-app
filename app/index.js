'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require("menu");

var windowStateKeeper = require('electron-window-state');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  var mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  var mainWindow = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    'icon': __dirname + "/img/icon.png",
  });
  mainWindow.loadURL('https://photos.google.com/');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindowState.manage(mainWindow);

  // menu
  var template = [
    {
    label: 'Edit',
    submenu: [
      {
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    },
    {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    },
    {
      type: 'separator'
    },
    {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    },
    {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    },
    {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    },
    {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.reload();
      }
    },
    {
      label: 'Toggle Full Screen',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Ctrl+Command+F';
        else
          return 'F11';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    },
    {
      label: 'Toggle Developer Tools',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Alt+Command+I';
        else
          return 'Ctrl+Shift+I';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.toggleDevTools();
      }
    },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
      label: 'Learn More',
      click: function() { require('electron').shell.openExternal('http://electron.atom.io') }
    },
    ]
  },
  ];

  if (process.platform == 'darwin') {
    //var name = require('electron').app.getName();
    var name = "Google フォト";
    template.unshift({
      label: name,
      submenu: [
        {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
      ]
    });
    // Window menu.
    template[3].submenu.push(
      {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
    );
  }

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
