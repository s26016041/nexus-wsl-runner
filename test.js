const { exec } = require('child_process');

exec('which nexus-network', (error, stdout, stderr) => {
  if (error) {
    console.error(`找不到 nexus-network: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  const path = stdout.trim();
  console.log(`nexus-network 路徑是: ${path}`);
  // 接下來你可以用這個 path 執行指令
});
