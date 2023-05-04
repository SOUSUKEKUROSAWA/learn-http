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
- 構造化されたデータをプレーンテキストとして送信するための非常に柔軟な方法
  - ただし，受信時はただの文字列として送られてくる
    - JSが解析できるようにJSオブジェクト，または配列に変換する必要がある
      - Pythonでは，配列または辞書に変換する
      - Goでは，スライス，マップ，または構造体に変換する
```js
const res = await fetch(...)
const jsObjRes = await res.json() // レスポンス（JSON）をJSオブジェクトに変換
```
- JSON.parse() vs JSON.stringfy()
  - JSON.stringfy()
    - リクエスト時
      - JSオブジェクトをJSON形式（文字列）へ変換できる
  - JSON.parse()
    - レスポンス後
      - JSON形式をJSオブジェクトへ変換できる
- XML
  - JSONが一般的になる前はXMLが一般的だった
  - 今でも仕様に問題があるわけではない
    - 書き方が違う，
      - JSONの方が冗長性が低いため，軽量
```xml
<root>
    <id>1</id>
    <genre>Action</genre>
    <title>Iron Man</title>
    <director>Jon Favreau</director>
</root>
```
```json
{
    "id": "1",
    "genre": "Action",
    "title": "Iron Man",
    "director": "Jon Favreau",
}
```
# ⌨️ (2:41:09) Ch 8 - HTTP Methods
- GET
  - サーバから表現またはコピーを取得
    - サーバ上の情報を更新しない
      - 何回呼んでも一緒
- これらのメソッドの用途は規約
  - 技術的には，GETリクエストでもリソースを作成することはできる
```js
await fetch(url, {
    method: "GET",
    mode: "cors", // ブラウザがセキュリティ上の目的でリクエストを強制終了しないようにする
    headers: {
        "sec-ch-ua-platform": "macOS"
    }
})
```
- CRUD
  - Create -> POST
  - Read -> GET
  - Update -> PUT
  - Delete -> DELETE
- POST
  - サーバ上に新しいリソースを作成する
    - サーバ上の情報を変更する
```js
await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json" // ボディで送信するデータの種類
        "X-API-Key": apiKey // 認証情報
    },
    body: JSON.stringfy(data)
})
```
- ステータスコード
  - すべてのHTTPレスポンスの状態を表す
  - ![](https://storage.googleapis.com/zenn-user-upload/78af69c19589-20230430.png)
  - 100~199
    - info
    - レアケース
  - 200~299
    - success
      - 200
        - OK
          - リクエストが機能していることを表す
      - 201
        - Created
          - サーバ上でリソースが作成されたことを表す
  - 300~399
    - redirect
      - 301
        - Moved permanently
          - このリクエストを処理するサーバが別の場所へ移動したことを表す
  - 400~499
    - client error
    - 認証されていないことをクライアントに伝える
      - 400
        - Bad request
          - 一般的な不適切なリクエストを表す
      - 403
        - Unauthorized
          - 認証されていないことを表す
            - APIキーを渡すのを忘れりするとこうなる
      - 404
        - Not found
          - 存在しないWebページにアクセスしようとしたことを表す
  - 500~599
    - server error
      - 500
        - Internal server error
          - サーバのバグやDBがダウンしていることを表す
- Patch vs PUT
  - PUT
    - リソース全体を更新する
      - リクエスト時に更新するオブジェクト全体を送信する
  - Patch
    - リソースの一部分を更新する
- Delete
```js
await fetch(url, {
    method: "DELETE",
    mode: "cors"
})
// どのリソースを削除するかはURLに含めることが多い
```
# ⌨️ (3:17:01) Ch 9 - URL Paths
- https://api.boot.dev/v1/courses_rest_api/learn-http/locations
  - v1
    - apiのバージョン
- RESTful
  - Representational State Transfer
  - 優れたAPIを開発するための規約
    - クライアントとサーバという2つの要素が分離していて不可知
      - 転送されるリソースに関する知識だけシェアされていれば，他の実装は何でもOK
    - ステートレス
      - サーバ／クライアントがそれぞれの状態を知る必要がない
# ⌨️ (3:36:33) Ch 10 - HTTPS security
![](https://storage.googleapis.com/zenn-user-upload/b73e260c8280-20230503.png)
- HTTPS
  - HTTPと基本は同じ
  - リクエストとレスポンスを安全に暗号化して保持する
    - 送信者としての私たちと受信者としてのサーバだけが復号できる
      - 送信者と受信者の間を仲介しているインターネットサービスプロバイダとか（Wi-fiを使用している場合はルータなど）は復号できないようになってる
- 暗号化
  - インターネット通信には仲介者がいる
    - よって，データを送信する前にクライアントで暗号化する必要がある
    - かつ，データを受信したサーバがデータを復号化出来る必要がある
  - ２つのキー
    - Publicキー（公開鍵）
      - 暗号化に使用
        - 逆に復号化することはできない
      - クライアントに提供できる
    - Privateキー（秘密鍵）
      - 復号化に使用
      - クライアントに提供できない
  - 通信の暗号化
    - リクエスト
      - クライアントは公開鍵を使用して一部の情報を暗号化し，サーバへ送信
      - サーバは秘密鍵を使用して情報を復号化
    - レスポンス
      - 非対称暗号法（公開／秘密鍵暗号法）を使用して，3番目の鍵（対称暗号化キー）を渡す
        - このキーはリクエスト毎に生成される
        - この単一のキーを使用してクライアント／サーバが情報を暗号化及び復号化出来るようになる
        - 公開鍵と秘密鍵によって，この対称暗号化キーが何になるかを把握できる
  - 暗号化の範囲
    - メッセージは暗号化されるが，通信相手や自分が誰であるかは実際には保護されない
# ⌨️ (3:48:24) Proj - Setup Dev Environment
- touch index.js
- node index.js
- npm init -y
```diff
"scripts": {
+ "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
- Jestでテスト駆動開発
  - JavaScriptのテスティングフレームワーク
  - npm install --save-dev jest
    - 開発環境でのみインストールされる
```diff
"scripts": {
  "start": "node index.js",
- "test": "echo \"Error: no test specified\" && exit 1"
+ "test": "jest"
},
```
## node_modulesディレクトリをリモートリポジトリにプッシュしてはいけない理由
- 容量節約
  - node_modulesディレクトリは、プロジェクトに必要な依存関係を含むため、通常非常に大きなディレクトリです。
  - これをリポジトリに含めると、リポジトリのサイズが著しく増加し、クローンやフェッチの速度が遅くなります。
- 依存関係の管理
  - package.jsonとpackage-lock.json（またはyarn.lock）ファイルは、プロジェクトに必要な依存関係とそのバージョンを明示的に記述しています。
  - node_modulesをリポジトリに含めると、依存関係の管理が複雑になり、バージョンの衝突が発生する可能性があります。
- 環境間の互換性
  - 開発者が異なる環境（例えば、異なるOS）で作業する場合、node_modules内のパッケージは環境固有のバイナリを含むことがあります。
  - リポジトリにnode_modulesを含めると、環境間の互換性の問題が発生する可能性があります。
- まとめ
  - 変更を追跡するのはpackage.jsonとpackage-lock.jsonのみで，node_modulesは含めない
  - 他の開発者はリポジトリクローン後，npm installすればパッケージを正常にインストールすることができて，node_modulesも復元することができる
## package.jsonだけではなく，package-lock.jsonもリモートリポジトリにプッシュする必要がある理由
- 依存関係のバージョン固定
  - package.jsonでは、依存関係のバージョン範囲を指定することが一般的です（例: "^1.0.0"）。
  - しかし、この方法では、開発者が異なるタイミングでnpm installを実行すると、同じバージョン範囲内であっても異なるバージョンの依存関係がインストールされる可能性があります。
  - これにより、バージョン間の微妙な違いによる予期しないバグや問題が発生することがあります。package-lock.jsonは、依存関係の正確なバージョンを記録するため、開発者間で一貫した環境を維持できます。
- 再現性の向上
  - package-lock.jsonは、依存関係のツリー構造と各パッケージの正確なバージョンを記録します。
  - これにより、他の開発者や環境でプロジェクトをセットアップする際に、同じ依存関係の構成を正確に再現できます。
  - これは、予期しない問題を防ぎ、デバッグ作業を容易にするのに役立ちます。
- インストール速度の向上
  - package-lock.jsonが存在する場合、npm installはpackage-lock.jsonに記載された依存関係のバージョンと構成を利用してインストールを行います。
  - これにより、依存関係の解決プロセスが高速化され、インストールがより迅速に行われます。
- まとめ
  - package.jsonとpackage-lock.jsonは役割が違うから両方必要
  - package.json
    - 依存関係のバージョン範囲を定義
    - プロジェクト情報
    - スクリプトの定義
      - npm start, npm devなど
    - 依存関係の管理
      - dependenciesとdevDependencies
  - package-lock.json
    - 依存関係のバージョンを固定
    - 再現性の向上
    - インストール速度の向上
# ⌨️ (3:56:29) Proj - Normalize URLs
# ⌨️ (4:11:05) Proj - URLs from HTML
# ⌨️ (4:27:49) Proj - The main.js file
# ⌨️ (4:33:10) Proj - Using Fetch
# ⌨️ (4:45:16) Proj - Recursively crawling the web
# ⌨️ (4:55:33) Proj - Print an SEO report
# ⌨️ (5:06:59) Proj - Conclusion
# ⌨️ (5:08:04) Congratulations