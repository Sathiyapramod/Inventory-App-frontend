const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    title:"Billing-App",
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const child = new BrowserWindow({
    parent:win,
    modal:true,
  })

  //load the index.html from a url
  win.loadURL("http://localhost:3000");
  
  child.loadURL('https://github.com');
  // Open the DevTools.
  win.webContents.openDevTools();
  child.removeMenu();
  child.setMenu(null);
  child.once('ready-to-show',()=>child.show());
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
