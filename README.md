# Shopify OAuth認証フローのデモ

## デモアプリの概要

- このデモは、ShopifyのOAuth認証フローをデモするためのものです。
- このデモでは、Admin APIを使ってShopifyの商品データを取得することができます。

## デモアプリの起動

```bash
npm install
node app/index.js
```

## ngrokでローカルサーバーを公開

```bash
ngrok http 3000
```
公開したURLを.envのHOST_NAMEに設定する
