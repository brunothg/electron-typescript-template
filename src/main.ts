import {BrowserWindow} from 'electron';
import * as path from 'path';
import InitData from './util/InitData';

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: typeof BrowserWindow;
  static initData: InitData;

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose() {
    const windowBounds = Main.mainWindow.getBounds()

    Main.initData.data.window = Main.initData.data.window ?? {};
    Main.initData.data.window.width = windowBounds.width;
    Main.initData.data.window.height = windowBounds.height;
    Main.initData.data.window.x = windowBounds.x;
    Main.initData.data.window.y = windowBounds.y;
    Main.initData.save();
  }

  private static onClosed() {
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.initData = new InitData();
    Main.initData.load();

    Main.mainWindow = new Main.BrowserWindow({
      title: 'Amazon Music Recorder',
      icon: path.join(__dirname, 'assets/icon/icon.png'),
      width: Main.initData.data?.window?.width ?? 800,
      height: Main.initData.data?.window?.height ?? 600,
      x: Main.initData.data?.window?.x,
      y: Main.initData.data?.window?.y,
      autoHideMenuBar: true,
      darkTheme: true,
      backgroundColor: 'black'
    });

    Main.mainWindow.loadURL('https://www.rockantenne.de/webradio/live');

    Main.mainWindow.on('close', Main.onClose);
    Main.mainWindow.on('closed', Main.onClosed);
    Main.mainWindow.on('page-title-updated', (evt) => {
      evt.preventDefault();
    });
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}
