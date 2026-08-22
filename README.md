# STONEWORK 最終ファイル一式

公開するページは、次の2つです。

```text
https://ishiya-san.com/
https://ishiya-san.com/stonework/
```

`/works/` のような別ページは作りません。加工の詳細と過去の加工一覧は、どちらも `STONEWORK` の1ページ内に表示します。

## トップページからの移動先

| トップページのボタン | 移動先 | 表示位置 |
|---|---|---|
| `VIEW MORE` | `/stonework/` | STONEWORKの先頭。加工の詳細から表示 |
| `過去の加工一覧を見る` | `/stonework/#works` | 同じSTONEWORK内の「過去の加工一覧」位置から表示 |

## STONEWORKページの内容

```text
加工の詳細
  アクセサリー・ペンダント加工
  彫刻加工
  穴あけ・拡張加工
  切断・研磨加工
  ご依頼時の注意事項
  ご相談フォーム

過去の加工一覧
  最新5件を常時表示
  「もっと見る」で10件ずつ追加表示
  すべて表示した時点で「もっと見る」は消える
```

## 右上の三本線メニュー

STONEWORKページ右上の三本線を押すと、次の場所へ移動できます。

```text
HOME             メインページ
STONEWORK        加工の詳細の先頭
PAST WORKS       過去の加工一覧
ITEM             オンラインストア
CONTACT          お問い合わせフォーム
```

## CUSTOMの削除

CUSTOM（ブレスレット作成シミュレーター）は、モバイルメニュー、トップページのCUSTOMセクション、公開ビルド対象から削除しています。

## GitHubへ配置するファイル

ダウンロードしたフォルダの中身を、GitHubリポジトリの一番上に配置してください。

```text
index.html                   既存ファイルを上書き
stonework/index.html         新規追加または上書き
stonework/main.js            新規追加または上書き
vite.config.ts               既存ファイルを上書き
sitemap-stonework-entry.xml  現在のsitemap.xmlへ追加する1行
README.md                    説明書
```

## サイトマップへの追加

現在の `sitemap.xml` を上書きしないでください。ZIP内の `sitemap-stonework-entry.xml` に書かれた1行だけを、既存 `sitemap.xml` の `<urlset>` と `</urlset>` の間に追加してください。

```xml
<url><loc>https://ishiya-san.com/stonework/</loc></url>
```

## microCMS

過去の加工一覧は、現在のサイトと同じ環境変数を使います。

```text
VITE_MICROCMS_API_KEY
```

すでに公開環境に設定済みなら、追加作業は不要です。APIキーはZIPに含めていません。

## SEO優先1・2 実装済み

今回のファイルには、次のSEO設定を実装しています。

| 実装内容 | 対象 |
|---|---|
| 「天然石加工・穴あけ・研磨・切断・彫刻・大阪・東大阪」を含むtitleとdescription | STONEWORK |
| canonical、robots | トップ・STONEWORK |
| OGP・Xカード | トップ・STONEWORK |
| LocalBusiness構造化データ（本店の住所・電話・営業時間・位置情報） | トップ |
| WebPage・Service構造化データ | STONEWORK |
| 加工内容が伝わるH1と画像alt | STONEWORK |

公開後は、Google Search Consoleで `https://ishiya-san.com/` と `https://ishiya-san.com/stonework/` をURL検査し、サイトマップを送信してください。構造化データは [Googleのリッチリザルトテスト](https://search.google.com/test/rich-results) で確認できます。

> 注意：構造化データに含めた住所・電話番号・営業時間は、現在のトップページに記載されている本店情報を使っています。店舗情報を変更した場合は、この情報も必ず更新してください。

## Google検索での表示名・ページタイトル

トップページのタイトルは次の表記です。

```text
天然石の加工・原石・屋久杉販売店｜有限会社やまなみ銘石
```

STONEWORKのタイトルは次の表記です。

```text
天然石加工｜穴あけ・研磨・切断・彫刻｜やまなみ銘石
```

トップページにはWebSite構造化データを追加し、検索結果のサイト名として「有限会社やまなみ銘石」、別名として「やまなみ銘石」をGoogleへ明示しています。Googleの最終表示は検索語やGoogle側の判断で変わる場合があります。

## 最終決定した検索結果タイトルとSEO設定

| ページ | title |
|---|---|
| トップページ | `天然石・原石・屋久杉販売と天然石加工｜やまなみ銘石（大阪・石切）` |
| STONEWORK | `天然石加工のご依頼・加工事例｜穴あけ・研磨・切断・彫刻｜やまなみ銘石` |

トップページには、商品販売・天然石加工・大阪/石切の地域性を伝えるdescription、canonical、robots、OGP・Xカード、LocalBusiness・WebSite構造化データを実装しています。

STONEWORKには、天然石加工のご依頼と加工事例を伝えるdescription、canonical、robots、OGP・Xカード、WebPage・Service構造化データを実装しています。画面上の大見出しも`天然石加工のご依頼・加工事例`へ統一しています。
