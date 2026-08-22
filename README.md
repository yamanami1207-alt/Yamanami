# STONEWORK 最小変更版

このファイル一式は、**添付いただいた現在の `index.html` の見た目・文章・画像・レイアウト・既存機能を変更せず**、加工に関するリンク先だけを `STONEWORK` ページへつなぐためのものです。

## 変更していること

トップページ内で変更しているのは、次のリンク先だけです。

| 現在の見た目・表示 | 変更後のリンク先 |
|---|---|
| モバイルメニューの `WORKS / 天然石の加工` | `/stonework/` |
| トップの `天然石の加工` 見出し | `/stonework/` |
| 4つの加工カードの `VIEW MORE` | `/stonework/` |
| `過去の加工一覧を見る` | `/stonework/#works` |

トップページの文章、画像、配色、余白、カード、モーダル、問い合わせフォーム、CUSTOM、ブログ、店舗案内は変更していません。

## STONEWORKページについて

`/stonework/` は、現在トップページ内に存在する「加工の詳細」と**同じ素材・画像・レイアウト・文章**を使った独立ページです。

- 穴あけ・穴の拡張
- 切断・研磨
- 彫刻
- アクセサリー・ペンダント加工
- 加工前の注意事項
- 過去の加工一覧

を1ページにまとめています。`過去の加工一覧を見る` を押すと、同じページの下部にmicroCMSの加工事例が開きます。

## GitHubへ配置するファイル

ダウンロードしたフォルダの中身を、GitHubリポジトリの一番上へ配置してください。

```text
index.html                 既存ファイルを上書き
stonework/index.html       新規追加
stonework/main.js          新規追加
vite.config.ts             既存ファイルを上書き
sitemap-stonework-entry.xml  現在のsitemap.xmlへ追加する1行
README.md                     説明書
```

`src/main.js`、`src/index.css`、`assets`、`BRACE.html`、CUSTOM関連ファイル、`package.json`、現在の `sitemap.xml` には変更を加えていません。今回のZIPにも含めていません。

## サイトマップへの追加（任意ですが推奨）

既存の `sitemap.xml` を上書きしないでください。ZIP内の `sitemap-stonework-entry.xml` に書かれた `<url>` の1行だけを、現在の `sitemap.xml` の `<urlset>` と `</urlset>` の間へ追加してください。

## microCMSの設定

過去の加工一覧は、現在のサイトと同じ環境変数を使用します。

```text
VITE_MICROCMS_API_KEY
```

すでに公開環境に設定済みであれば、追加作業は不要です。APIキーはZIPに含めていません。

## 公開後の確認URL

```text
https://ishiya-san.com/
https://ishiya-san.com/stonework/
https://ishiya-san.com/stonework/#works
```

トップページは現在の見た目のままです。`/stonework/` のみが、新しく追加されるページです。
