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
