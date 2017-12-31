const spawn = require("child_process").spawn;
// const pipe = spawn("mongod", []);
// pipe.stdout.on("data", function(data) {
//   console.log(data.toString("utf8"));
// });
// pipe.stderr.on("data", function(data) {
//   console.log(data.toString("utf8"));
// });
// pipe.on("close", function(code) {
//   console.log("Process exited with code: " + code);
// });

// Module to control application life.
// Module to create native browser window.
const { app, Menu, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");

// require("../build/prod-server.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  require("../build/prod-server.js");
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000/");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // pipe.kill("SIGINT");
    mainWindow = null;
  });

  if (process.platform === "darwin") {
    // Create our menu entries so that we can use MAC shortcuts
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: "Edit",
          submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "pasteandmatchstyle" },
            { role: "delete" },
            { role: "selectall" }
          ]
        }
      ])
    );
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
