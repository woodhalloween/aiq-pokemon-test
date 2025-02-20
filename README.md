# AIQ ポケモンチャレンジ

PokéAPIを使用して初代151匹のポケモンを表示・検索できるNext.jsアプリケーション

## 機能

- PokéAPIを使用した初代151匹のポケモン表示
- ポケモン名での検索機能
- Tailwind CSSを使用したレスポンシブデザイン
- TypeScriptによる型安全性
- Dockerによる簡単なデプロイ

## 開始方法

### 通常のセットアップ

1. リポジトリをクローン
2. 依存関係のインストール:
```bash
npm install
```
3. 開発サーバーの起動:
```bash
npm run dev
```
4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### Dockerでのセットアップ

1. DockerとDocker Composeがインストールされていることを確認
2. コンテナのビルドと起動:
```bash
docker-compose up --build
```
3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

コンテナの停止:
```bash
docker-compose down
```

## 実装時間

実装時間: 約2時間

## 使用技術

- Next.js
- TypeScript
- Tailwind CSS
- PokéAPI
- Docker
