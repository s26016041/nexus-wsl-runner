# 功能介紹

此腳本的功能如下：

- 執行後，使用者需輸入 `cli` 密碼與想重啟時間。
- 腳本將透過 CLI 自動執行 `nexus Contribute via CLI`。
- 為避免命令提示字元（CMD）卡住，每隔自訂時間會自動關閉舊的 CMD 視窗，並啟動新的 CMD 來重新執行任務，確保任務穩定執行不中斷。

# Nexus Network 安裝指南

> ⚠️ **注意：請先安裝好以下工具：**
> 
> - [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/zh-tw/windows/wsl/install)
> - `curl` 指令（大多數系統已內建）

---

## 1. 在 WSL 中安裝 CLI 工具

```bash
curl https://cli.nexus.xyz/ 
```

## 2. 使用流程

1.下載 Releases 最新版 .exe 檔   
2.到網站找你得 7 位數密碼: `https://app.nexus.xyz/nodes`  
3.輸入密碼和想要的重啟時間
![alt text](image.png)

