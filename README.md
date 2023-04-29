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