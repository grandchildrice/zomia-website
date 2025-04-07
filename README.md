# ZOMIA - 暗号結社ウェブサイト

![ZOMIA Logo](/public/images/zomia_logo.svg)

「十分に発達した暗号技術は、魔法と見分けがつかない」

## 概要

ZOMIAは、近未来暗号（Post-modern Cryptography）の研究と実装に特化した暗号結社です。生体暗号/認証、耐量子暗号、秘密計算技術、検証可能計算などの先端技術を探求し、セキュリティと暗号技術の未来を形作ります。

このリポジトリは、ZOMIAの公式ウェブサイトのソースコードを含んでいます。宇宙的・SF的・レトロ・魔法的要素を融合した独特のデザインで、暗号結社としての神秘的な世界観を表現しています。

## 技術スタック

- **フロントエンド**: TypeScript, Next.js, Tailwind CSS
- **データ連携**: Notion API
- **多言語対応**: 日本語・英語

## 機能

- 魔法的・宇宙的・レトロ・SF的要素を融合した独特のUI/UXデザイン
- 多言語対応（日本語・英語）
- NotionデータベースとのAPI連携
- レスポンシブデザイン（モバイル対応）
- アニメーションとインタラクティブ要素

## インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/your-username/zomia-website.git
cd zomia-website

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスすると、ウェブサイトが表示されます。

## 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

## プロジェクト構造

```
zomia-website/
├── public/             # 静的ファイル
│   └── images/         # 画像ファイル
├── src/                # ソースコード
│   ├── app/            # Next.js App Router
│   ├── components/     # 再利用可能なコンポーネント
│   ├── lib/            # ユーティリティ関数
│   ├── locales/        # 多言語対応ファイル
│   └── styles/         # グローバルスタイル
├── .env.local          # 環境変数（gitignore）
├── next.config.js      # Next.js設定
├── package.json        # 依存関係
└── tailwind.config.js  # Tailwind CSS設定
```

## カスタマイズ方法

- `src/locales/translations.json` - 多言語テキストの編集
- `src/lib/notionAPI.tsx` - Notion APIの連携設定
- `src/styles/globals.css` - グローバルスタイルの編集
- `src/components/` - 各コンポーネントの編集

## デプロイ方法

このプロジェクトは、Vercel、Netlify、GitHub Pagesなどの静的ホスティングサービスにデプロイできます。

### Vercelへのデプロイ例

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel
```

## 主な機能

### Research
PSE、ブロックチェーン企業などからの助成金を通じて、暗号技術に関する研究を共同で行っています。生体暗号/認証、耐量子暗号、秘密計算技術、検証可能計算などの研究テーマに取り組んでいます。

### Business
自動化されたセキュリティエージェントを使用した企業向けのレッドチーム演習とセキュリティ診断を提供しています。

### Community
ZK TokyoやCore Programなどのゼロ知識証明コミュニティの運営を行っています。

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 貢献

プルリクエストや機能リクエストは歓迎します。大きな変更を加える前に、まずissueを開いて議論してください。

## 連絡先

質問や提案がある場合は、[お問い合わせフォーム](https://your-zomia-website.com/contact)からご連絡ください。

---

「暗号結社ZOMIA - 十分に発達した暗号技術は、魔法と見分けがつかない」
