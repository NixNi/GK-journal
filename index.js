const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false // Включить доступ к Node.js API внутри окна браузера
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile('index.html'); // Загрузить HTML-файл вашего приложения
}

app.whenReady().then(createWindow);
