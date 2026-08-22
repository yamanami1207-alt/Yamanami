# STONEWORK 実装ファイル一式

この一式は、やまなみ銘石サイトを次の構成へ変更するためのものです。

```text
https://ishiya-san.com/             トップページ
https://ishiya-san.com/stonework/   天然石加工・加工事例
```

## 実装される内容

- トップページの「天然石の加工」「VIEW MORE」から `/stonework/` へ移動
- トップページの「過去の加工一覧を見る」から `/stonework/#works` へ移動
- `STONEWORK` ページに、穴あけ・穴拡張・切断・研磨・彫刻・アクセサリー加工を掲載
- 同じ `STONEWORK` ページ内に、microCMSの過去の加工事例を表示
- 通常は代表3件を表示し、「すべての加工事例を見る」で全件表示
- `/works/` へアクセスした場合も、`/stonework/#works` に案内
- CUSTOM（ブレスレット作成）をViteのビルド対象から除外
- sitemap.xmlをトップページとSTONEWORKページへ整理

## GitHubへ配置するファイル

ダウンロードしたフォルダ内の構成を、そのままリポジトリの一番上に配置してください。

```text
index.html                      既存ファイルを上書き
src/main.js                     既存ファイルを上書き
stonework/index.html            新規追加
stonework/main.js               新規追加
works/index.html                既存ファイルを上書き（旧URL案内用）
vite.config.ts                  既存ファイルを上書き
sitemap.xml                     既存ファイルを上書き
README_STONEWORK.md             説明書
```

`works/main.js` は新構成では使いません。残っていても公開ページには影響しませんが、不要であれば削除できます。

## 重要: microCMS APIキー

STONEWORKページは、既存サイトと同じ環境変数を使用します。

```text
VITE_MICROCMS_API_KEY
```

すでにGitHubの公開環境でこの環境変数を設定している場合は、そのままで構いません。設定していない場合は、利用している公開サービスの環境変数設定に `VITE_MICROCMS_API_KEY` を追加してください。

APIキーそのものは、GitHubのソースコードやこのダウンロード一式には入れていません。

## 公開前チェック

GitHubへ反映後、次のURLを確認してください。

```text
https://ishiya-san.com/
https://ishiya-san.com/stonework/
https://ishiya-san.com/stonework/#works
https://ishiya-san.com/works/
```

`/works/` はSTONEWORK内の「過去の加工事例」へ移動すれば正しい状態です。

## 反映後に確認すること

1. トップページの加工カードと「過去の加工一覧を見る」がSTONEWORKへ移動すること。
2. `STONEWORK` ページ内で、加工内容と過去の加工事例が表示されること。
3. microCMSに登録した加工事例が表示されること。
4. 「すべての加工事例を見る」ボタンが事例数4件以上で表示されること。
5. お問い合わせボタンがトップページの問い合わせフォームへ移動すること。
