# NodeJS を触ってみよう

## 対象者

* JavaScript が最低限少しは理解している  
  (例えばブラウザで alert を表示できるレベル、もしくはそれ以上の人)
* NodeJS 未経験

## NodeJS とは？

ブラウザでしか動かない JavaScript を **どこでも動かそうぜ** ってツールです。  
ブラウザ以外のどこでも動かせるので、サー婆サイドなどにも用いられます。

今回、Mac 版と Windows 版について触れていきます。

## 予めインストールしておくもの

* パッケージマネージャー  
  端的に言うと **コマンド一発でアプリを入れようぜ** ってツールです。
  重宝する(し、今回インストール編で長々とした記事書きたくない)のでインストールしておきましょう。
    * Windows
        * [Chocolatey](https://chocolatey.org)
    * Mac
        * [Homebrew](https://brew.sh/index_ja)
* 好きなテキストエディタ ([Visual Studio Code](https://www.microsoft.com/ja-jp/dev/products/code-vs.aspx)を強く推奨)  
  ちなみにこれも上記パッケージマネージャーでインストールできます。
  本題から外れるので割愛しますが、余力があれば調べてみると良いでしょう。

## NodeJS をインストールしよう

### Windows

1. 管理者権限で PowerShell、もしくは コマンド プロンプトを起動します。
2. 下記のコマンドを実行するとインストールされます。  
   `-y` オプションを省略すると、“本当にインストールするの？” と `[y/N]` 確認が出ます。

```PowerShell
> choco install -y nodejs
```

### Mac

1. ターミナル アプリを起動します。
2. 下記のコマンドを実行するとインストールされます。

```sh
$ brew install node
```

### インストール確認

3. 下記のコマンドを実行して、インストールされていることを確認します。  
   正しくインストールされている場合、バージョン番号が表示されます。

```sh
$ node -v
```

## Hello, world!

```sh
$ node -e 'console.log("Hello, world!")'
```

## NodeJS プロジェクトを作ろう

NodeJS プロジェクト ファイルとなる、`package.json` を作ります。

```sh
$ npm init
```

いくつかの質問が出てきますが、そのまま既定値 (Enter 連打) で OK です。  
細部は異なるかもしれませんが、ざっくりこんな感じの内容ができると思います。

```JSON
{
  "name": "nodejs-practice",
  "version": "1.0.0",
  "description": "## NodeJS とは？",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/danmaq/nodejs-practice.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/danmaq/nodejs-practice/issues"
  },
  "homepage": "https://github.com/danmaq/nodejs-practice#readme"
}
```

ここで重要なのは、`"scripts": { ... }` の中身です。
今は `"test"` だけがありますが、これはコマンドとして npm から動かすことができます。

```sh
$ npm run test
Error: no test specified
npm ERR! Test failed.  See above for more details.
```

`exit 1` など終了時に `0` 以外を返すと、エラーとして認識させることができます。
ここでは “テストなんてない” って意味でしょうか。

早速ここにコードを追加しましょう。そうですね、さっきの Hello, world! を書いて見ましょう。

```diff
  "scripts": {
+   "start": "node -e \"console.log('Hello, world!')\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`"` が入れ子になってしまうので `\` でエスケープ(後続ワードをただの文字扱いに)してやる必要があります。

書き終わったら早速実行してみましょう。

```sh
$ npm run start
Hello, world!
```

なお、`"start"` のような[一部のコマンド](https://docs.npmjs.com/misc/scripts)は、`npm start` と `run` を省略できます。

## NodeJS プロジェクトで JavaScript ソースコードを書いて動かす

前回ワンライナーだけで終わってしまいましたが、今度はちゃんとしたソースコードを動かして見ましょう。

たとえば 1〜10 を表示するけど、3 の倍数だけ `🤔` を表示するスクリプトを書いてみましょう。
`index.js` という空のテキストファイルを作成して、中身を下記のようにします。

```JavaScript
Array(10)
  .fill()
  .map((undef, index) => index + 1)
  .map(value => value % 3 ? value : '🤔')
  .forEach(value => console.log(value));
```

次に先ほどの `"start"` を書き換えましょう。

```diff
  "scripts": {
-   "start": "node -e \"console.log('Hello, world!')\"",
+   "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

(なお、これら `"scripts": { ... }` に囲まれている部分を総称して **npm-scripts** と呼びます。以後そのように表記します)

書き終わったら早速実行してみましょう。

```sh
$ npm start
0番目は、1
1番目は、2
2番目は、🤔
3番目は、4
4番目は、5
5番目は、🤔
6番目は、7
7番目は、8
8番目は、🤔
9番目は、10
```

無事スクリプトが動きました。

# TODO

* `_.range()`
* `npm install`
* `node_scripts`
