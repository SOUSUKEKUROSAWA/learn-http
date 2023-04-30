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
- クライアントとサーバは1対1の関係ではない
  - サーバは複数のクライアントとやり取りしているのが一般的
    - IPアドレスで識別する
      - 4バイトの情報（IPｖ4）
        - 8.13.156.7
        - `<0~255(2^8)>.<0~255>.<0~255>.<0~255>`
      - 4バイトだと枯渇する可能性があるので，現在進行形で8バイトのIPアドレス（IPｖ6）に移行している
        - `<0~255(2^8)>:<0~255>:<0~255>:<0~255>:<0~255>:<0~255>:<0~255>:<0~255>`
- DNS
  - Domain Name System
    - IPアドレスを人間が判別しやすいような名前をIPアドレスにマッピングする
    - IPアドレスを更新しやすくなるという副次的な利点もある（ドメイン名を変更せずにIPアドレスだけ変更できるから）
  - デプロイ
    - AWS，GCPなどのクラウドプロバイダーを用いてサーバ上にコードをデプロイすると，IPアドレスを取得できる
    - ドメイン名はAmazon，Google，Namecheapなどのレジストラから購入する必要がある
      - レジストラが持つサービスによってドメイン名とIPアドレスが関連付けられてアクセスできるようになる
  - `URL()`
    - 文字列をURLオブジェクトとして認識し，ドメイン名などを取り扱うことができる
    - https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
  - ICANN
    - インターネットの巨大な電話帳の発行者
    - DNSの管理を行っている
      - ルートネームサーバ
        - IPアドレスとドメイン名の電話帳（複数存在し，分散管理されている）
        - どのように接続しているのか
          - デフォルトでコンピュータのネットワーク構成に組み込まれてる
  - サブドメイン
    - ex.) api.boot.dev
      - api
        - サブドメイン
      - dev
        - トップレベルドメイン
      - boot
        - ドメイン名
    - サブドメインを使用すると，新しいドメイン名を購入しなくても，ドメイン名でホストされているリソースを分割できる
# ⌨️ (0:48:11) Ch 3 - URIs and URLs
![](https://storage.googleapis.com/zenn-user-upload/70ae55eb73a5-20230429.png)
- Uniform Resource Identifier
  - URLを包含する
  - 必ずしもインターネット経由でアクセスできないものも参照できる
    - 書籍のISBN番号など
  - インターネットを扱うときはURLを扱う
- ex.) http://testuser:testpass@testdomain.com:8080/testpath?testsearch=testvalue#testhash
  - protocol -> http:
    - 必須
    - 通信プロトコル
      - http呼び出しを介してアクセスできる
      - DB接続にはpostgressのようなものを使用する場合がある
      - メールアドレスにはmailtoを使用する
  - //
    - 認証コンポーネント
      - httpはユーザ名やパスワードなど認証情報を含めることができるためついている
  - username -> testuser
    - オプション
  - password -> testpass
    - オプション
    - ユーザ名やパスワードは通常，URL自体ではなく，フォームの送信を介して使用される
  - @
    - パスワードとホスト名のセパレータ
  - hostname -> testdomain.com
    - 必須
  - port -> 8080
    - プロトコルごとにデフォルトのポート番号がある
      - httpプロトコルの場合，80がデフォルト
        - ポートを指定しない場合，リクエストはデフォルトでport=80を使用する
      - httpsを使用する場合，443がデフォルト
  - pathname -> /testpath
  - search/query -> ?testsearch=testvalue
    - キーと値のペア
  - hash/fragment -> #testhash
    - ページの特定のセクションへのリンク
- ポート
  - 同じ物理マシンで複数のソフトウェアをホストするためのソリューション
    - OSによって管理される仮想の小さなハブ
    - ex.) Server
      - Web site
        - パブリックに公開
      - DB
        - 自宅のPCにのみ公開
    - OSはどのソフトウェアがどの受診ネットワーク要求を処理する必要があるかを知らない
      - ポートを分けることによって通信を分割できる
        - 2つのソフトウェアを同じポートにバインドすることはできません
      - OSでは，65000以上の異なるポートを同時に使用できる
- localhost
  - 自分のコンピュータのドメイン
- ルーティング
  - 従来のファイルサーバは通常，慣例により，ディレクトリのパスをそのディレクトリ内のindex.htmlというファイルにルーティングする
  - 同じディレクトリの別のファイルにアクセスしたい場合は`<domain>/<file name>`とすればよい
  - ex.) 内部の異なるディレクトリにアクセスしたい場合
    - `<domain>/<directory name>/<file name>`
      - ファイル名を指定しない場合は，指定したディレクトリ内のindex.htmlを表示する
# ⌨️ (1:16:21) Ch 4 - Async JavaScript
![](https://storage.googleapis.com/zenn-user-upload/4a0438bed0c6-20230429.png) 
- 非同期処理
  - 同時に複数のことを行うことができる
- Promise
  - 3つの状態を持つ
    - 待機 (pending)
      - 初期状態。成功も失敗もしていません。
    - 履行 (fulfilled)
      - 処理が成功して完了したことを意味します。
    - 拒否 (rejected)
      - 処理が失敗したことを意味します。
- I/O Timings
  - RAM -> 10^(-9) s -> sync
    - 変数の作成，更新，削除などの操作
      - 非同期で処理する必要は全くないくらい早い
      - すべて同期的に行うことができる
  - Disk -> 10^(-3) s -> async/sync
    - ファイルシステムにアクセスして，テキストファイルを読み込んで分析を行うなどの操作
      - ソリッドステートドライブを使用している場合は，これよりもはるかに高速
      - ディスクから大量のデータを読み取っている場合は，同期的に実行すると問題が発生する可能性があるほど低速
  - Network -> 10^(-1) ~ 1 s -> async
    - HTTPリクエストなど
      - 人間に気づかれるくらい低速
- await
  - プロミスが返ってくるまで処理を停止する
    - JSのコード全体が停止するわけではない
  - 非同期処理の中で同期的に処理を行うことができる
- async
  - コードを同期的処理の時と同じように書くことができるため，同期的な方法で非同期処理のコードを考えることができる
- .then() vs await
  - .then()の方がネストによる結合が強い
```js
// then()
fetchUser
    .then(user => fetchLocationForUser(user))
    .then(location => fetchServerForLocation(location))
    .then(server => console.log(`The server is ${server}`))

// await
const user = await fetchUser()
const location = await fetchLocationForUser(user)
const server = await fetchServerForLocation(location)
console.log(`The server is ${server}`)
```
# ⌨️ (1:49:48) Ch 5 - Errors in JS
- HTTPや一般的なネットワークを操作する場合に非常に重要
  - ex.) コンピュータでJSコードを実行していて突然インターネット接続が失われた場合
    - コードに問題はなくても，リモートサーバからデータをフェッチすることはできなくなる
  - ex.) 外部のライブラリを使用していて，参照先が制御できない場合
    - try/catch構文で囲うことでエラーをハンドリングできる
- Bugs vs Errors
  - Bug
    - コード内で発生する予期しないこと -> コードで修正するもの
      - 発生した場合はコードを修正するしかない
  - Error
    - 予期できること -> コードで処理するもの
      - 避けられないものの可能性もあり，コードを修正しても取り除くことができないものもある
        - ex.)
          - No Internet Connection
          - Remote Server Down
          - Bad User Input
      - 避けられないものに関してはうまくハンドリングする必要がある
- async/await vs promise
  - async/await
    - 可読性やエラーハンドリングを重視する場合
  - Promise
    - 柔軟性や並行処理を重視する場合
## 関数宣言ではなく，アロー関数を使うとエラーが発生する問題
```js
try {
    printCharacterStats(4)
    printCharacterStats("ten")
    printCharacterStats(10)
} catch (error) {
    console.log(error)
}

const printCharacterStats = level => {
    if (isNaN(level)) {
        throw "Parameter is not a number"
    }
    console.log(`level: ${level}`)
}
```
- 状況
  - 上記のコードをブラウザで実行
  - `ReferenceError: printCharacterStats is not defined`
- 原因
  - アロー関数宣言と関数宣言では巻き上げ（hosting）を行うときの挙動に違いがあるから
    - 関数宣言は関数の巻き上げに分類され，スコープ全体で有効になり，コードのどこからでも使用できる
    - アロー関数宣言は変数の巻き上げに分類され，ブロックレベルでの巻き上げしか行われない
- 解決策
  - 関数宣言に変更する　OR　アロー関数の宣言を使用箇所よりも前に持ってくる
```diff
try {
    printCharacterStats(4)
    printCharacterStats("ten")
    printCharacterStats(10)
} catch (error) {
    console.log(error)
}

- const printCharacterStats = level => {
+ function printCharacterStats(level) {
    if (isNaN(level)) {
        throw "Parameter is not a number"
    }
    console.log(`level: ${level}`)
}
```
```diff
+ const printCharacterStats = level => {
+     if (isNaN(level)) {
+         throw "Parameter is not a number"
+     }
+     console.log(`level: ${level}`)
+ }

try {
    printCharacterStats(4)
    printCharacterStats("ten")
    printCharacterStats(10)
} catch (error) {
    console.log(error)
}

- const printCharacterStats = level => {
-     if (isNaN(level)) {
-         throw "Parameter is not a number"
-     }
-     console.log(`level: ${level}`)
- }
```
# ⌨️ (2:04:54) Ch 6 - HTTP Headers
- HTTPリクエストやレスポンスに関するメタデータを持っている
  - クライアントタイプ
    - ex.) Google Chrome
  - OS
    - ex.) Windows
  - 言語
    - ex.) US English
  - 認証情報
    - 自分が誰であるかを示す情報はヘッダーに持たせることが多い
      - X-API-Key
        - リクエストユーザー固有のキー
- ブラウザの検証モード
  - ネットワーク
    - どのようなリクエストが出されているか，それらのスピードなどの情報が見られる
- ヘッダーは基本的に文字列として解析される
  - 数値として扱いたい場合は変換する必要がある可能性がある
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