const { exec } = require("child_process");
const readline = require('readline');

network_address = ''
restartIntervalMinutes = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(question, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function runOnce(cli) {
  exec(`cmd.exe /c start cmd.exe /k "wsl ${network_address} start --node-id ${cli}; exec bash"`);

  await sleep(restartIntervalMinutes * 60 * 1000);

  exec('cmd.exe /c taskkill /F /IM cmd.exe /T')
}

async function run(cli) {
  while (true) {
    await runOnce(cli);
    await sleep(1000);
  }
}

async function GeyNetworkAddress() {
  return new Promise((resolve, reject) => {
    exec('wsl bash -ic "which nexus-network"', { cwd: "C:\\Windows" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ 錯誤: ${error.message}`);
        return reject(error);
      }
      if (stderr && stderr.trim()) {
        console.error(`⚠️ 錯誤輸出: ${stderr}`);
        return reject(stderr);
      }

      resolve(stdout.trim());
    });
  });
}

async function main() {
  const cli = await ask('請輸入你的CLI：');
  restartIntervalMinutes = await ask('你希望幾分鐘重啟 CMD ：');

  network_address = await GeyNetworkAddress()
  console.log('正在執行請勿關閉 ......')

  await sleep(1000);
  await run(cli);
}

main() 