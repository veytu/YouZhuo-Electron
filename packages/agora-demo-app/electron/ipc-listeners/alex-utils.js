const os = require('os');
const electron = require('electron');
const child = require('child_process');
function checkMac() {
  const interfaces = os.networkInterfaces();
  let macAddress;
  for (let iface of Object.values(interfaces)) {
    for (let alias of iface) {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal && alias.mac && alias.mac !== '00:00:00:00:00:00') {
        macAddress = alias.mac;
        break;
      }
    }
    if (macAddress)  break;
  }
  // if (!(macAddress && macAddress !== '00:00:00:00:00:00')) {
  //   macAddress = electron.ipcRenderer.invoke('get-mac-address');
  // }
  // if (!(macAddress && macAddress !== '00:00:00:00:00:00')) {
  //   for (const iface in interfaces) {
  //     for (const ifaceDetails of interfaces[iface]) {
  //       // 检查接口类型和 MAC 地址
  //       if (ifaceDetails.mac && ifaceDetails.mac !== '00:00:00:00:00:00') {
  //         macAddress = ifaceDetails.mac;  // 返回第一个有效的 MAC 地址
  //         return macAddress;
  //       }
  //     }
  //   }
  // }
  return "d0:65:78:e5:1c:81";
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
