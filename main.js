const { exec } = require("child_process");
const readline = require('readline');

network_addres = ''

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
  // 開新視窗執行 nexus-network
  exec(`cmd.exe /c start cmd.exe /k "wsl ${network_addres} start --node-id ${cli}; exec bash"`);

  await sleep(10 * 60 * 1000); // 10 分鐘 = 10 x 60秒 x 1000毫秒

  // 關閉所有 cmd.exe
  exec('cmd.exe /c taskkill /F /IM cmd.exe /T')
}

async function run(cli) {
  while (true) {
    await runOnce(cli);
    await sleep(1000); // 每輪之間再等 1 秒（可視需要調整）
  }
}


async function main() {
  const cli = await ask('請輸入你的CLI：');
  network_addres = await ask('請輸入你的 nexus-network 路徑(不知道的話請在 wsl 輸入 which nexus-network)：');
  console.log('正在執行請勿關閉 ......')

  await sleep(1000);
  await run(cli);
}

main() 