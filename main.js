
const electron = require('electron');
const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		backgroundColor: '#000000',
		icon: './icon.png'
	});

	mainWindow.setTitle('Smart mirror');
	mainWindow.loadURL('http://localhost:4200');
  	// mainWindow.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
