const os = require('os');
const electron = require('electron');
const child = require('child_process');
function checkMac() {
  const interfaces = os.networkInterfaces();
  let macAddress;
  for (let iface of Object.values(interfaces)) {
    for (let alias of iface) {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        macAddress = alias.mac;
        break;
      }
    }
    if (macAddress) break;
  }
  return macAddress;
}

function checkSys() {
  const displays = electron.screen.getAllDisplays();
  const restMemo = os.freemem();
  const memo = os.totalmem();
  const sysObj = {
    screenNum: displays.length,
    restMemo,
    memo,
  };
  return sysObj;
}

function startRecord() {
  const command = `obs-cli recording start`;
  child.execSync(command);
}
function stopRecord() {
  const command = `obs-cli recording stop`;
  child.execSync(command);
}

module.exports = {
  checkMac,
  checkSys,
  startRecord,
  stopRecord,
};
