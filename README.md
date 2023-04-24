# https://youtu.be/2JYT5f2isg4
- code
  - https://github.com/bootdotdev/fcc-learn-http-assets
- boot.dev
  - https://boot.dev/learn/learn-http
# ⌨️ (0:03:32) Ch 1 - Why HTTP
- Hyper Text Transfer Protocol
  - コンピュータ同士の通信に関する共通規則
  - 実際には0と1の集まり
- リクエスト（from client）・レスポンス（from server） 
  - 同期的
- JavaScript's Fetch API
  - HTTPリクエストを作成する
  - 組み込み関数
  - `const response = await fetch(url, settings)`
    - await
      - レスポンスが返ってくるまで待つ
        - 待たないと，リクエストを送っただけで次の処理に進んでしまう
  - `const responseData = await response.json()`
    - レスポンスデータはJSONで返ってくる
```js
const apiKey = generateKey()
const url = getURL()
const settings = getSettings()

const response = await fetch(url, settings)
const responseData = await response.json()

logItems(responseData)

function getSettings() {
  return {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  }
}

function getURL() {
  return 'https://api.boot.dev/v1/courses_rest_api/learn-http/items'
}

function generateKey() {
  const characters = 'ABCDEF0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function logItems(items) {
  for (item of items) {
    console.log(item.name)
  }
}
```
# ⌨️ (0:27:31) Ch 2 - DNS
# ⌨️ (0:48:11) Ch 3 - URIs and URLs
# ⌨️ (1:16:21) Ch 4 - Async JavaScript
# ⌨️ (1:49:48) Ch 5 - Errors in JS
# ⌨️ (2:04:54) Ch 6 - HTTP Headers
# ⌨️ (2:21:04) Ch 7 - JSON
# ⌨️ (2:41:09) Ch 8 - HTTP Methods
# ⌨️ (3:17:01) Ch 9 - URL Paths
# ⌨️ (3:36:33) Ch 10 - HTTPS security
# ⌨️ (3:48:24) Proj - Setup Dev Environment
# ⌨️ (3:51:28) Proj - Hello World
# ⌨️ (3:56:29) Proj - Normalize URLs
# ⌨️ (4:11:05) Proj - URLs from HTML
# ⌨️ (4:27:49) Proj - The main.js file
# ⌨️ (4:33:10) Proj - Using Fetch
# ⌨️ (4:45:16) Proj - Recursively crawling the web
# ⌨️ (4:55:33) Proj - Print an SEO report
# ⌨️ (5:06:59) Proj - Conclusion
# ⌨️ (5:08:04) Congratulations