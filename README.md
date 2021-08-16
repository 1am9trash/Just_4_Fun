## Just 4 Fun

- **網址**：https://1am9trash.github.io/Just_4_Fun/

- **內容**：React 框架做的學分計算網站，後端資料使用 google 的 firebase，UI 庫使用 antd

  ![](img/sample.png)

- **在本地建設網頁**：

  - 移到網頁文件所在的檔案夾：`cd web`
  - 下載 package.json 中的依賴包：`npm install`
  - 開啟 server：`npm start`

- **待實做的功能**：

  - [x] 導入成績
  - [x] 編輯／刪除課程
  - [x] 計算統計資料
  - [x] 編輯修課標準
  - [x] 連接後端，建立存檔（沒建自己的 server，用的 google 的 firebase，或許開學可以拿樹莓派試試看）
  - [ ] 架構優化

- **gh-page 操作備忘**：

  - 配置`package.json`（只有第一次發布需要配置）
    ```json
    "scripts": {
        // 如果使用react，原本會有的script
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        // 在最後加上deploy
        "deploy": "gh-pages -d build"
    },
    ```
  - 編譯專案：`npm run build`
  - 發布至 gh-page：`npm run deploy`

- 感謝[@Ligoon](https://github.com/Ligoon)測試
