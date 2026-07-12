Mountain Log は、山行（登山・山スキーなど）の記録をMDXで書き溜め、一覧・詳細ページで見られる個人ログサイトです。

## Getting Started

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## 設計方針

### コンテンツモデル

- 各山行記録は `contents/*.mdx` に1ファイル1記録で置く。ファイル名（拡張子抜き）がそのままslugになる。
- frontmatterは以下の形（[lib/records.ts](lib/records.ts) の `RecordFrontmatter` 型で定義）。

  ```yaml
  ---
  title: 大崩山 山スキー
  date: 2025-12-31
  area: 北アルプス
  members: [A, B]
  gpx: /gpx/20251231_ohkue_ski.gpx
  ---
  ```

  - `date` はYAML上はDate型としてパースされるため、`lib/records.ts` 側で `YYYY-MM-DD` 文字列に正規化している。
  - `gpx` はGPXトラックファイル（`public/gpx/` 配下）へのパス。現時点では保持のみで、地図表示にはまだ使っていない（後述）。

### ページ構成とレンダリング方式

- `contents/` 配下は `app/` の外にあるため、Next.jsのファイルベースルーティングには乗らない。一覧・詳細ともにビルド時にディレクトリを走査してslugを列挙し、`next-mdx-remote-client` でMDX本文をレンダリングする方式を採用（[lib/records.ts](lib/records.ts)）。
- [app/records/page.tsx](app/records/page.tsx): `getAllRecords()` で全記録のfrontmatterを日付降順で取得し、一覧表示。
- [app/records/[slug]/page.tsx](app/records/[slug]/page.tsx): `generateStaticParams` でビルド時に全slug分を静的生成し、frontmatterのヘッダー表示＋MDX本文をレンダリング。

### MDX関連の依存整理

`@next/mdx` / `@mdx-js/loader` / `@mdx-js/react` と `next-mdx-remote-client` の2系統が入っているが、役割が異なるため両方残している。

- `@next/mdx`（[next.config.ts](next.config.ts) で有効化）: `.mdx` ファイルを `app/` 配下のページ/コンポーネントとして直接コンパイルする用途（例: 将来 `app/about/page.mdx` のような静的ページ）。
- `next-mdx-remote-client`: `contents/` に置いた記録ファイルを実行時に読み込んでレンダリングする用途。記録の一覧・詳細はこちら。

重複して同じ役割を持っていた `next-mdx-remote`（non-client版）は未使用だったため削除した。

### スタイリング

- Tailwind CSS v4のCSSファースト設定（[app/globals.css](app/globals.css) の `@import "tailwindcss";`）を使用。
- `@tailwindcss/typography` は `@plugin "@tailwindcss/typography";` でCSS側から登録している。v3形式の `tailwind.config.js` はv4のCSSファースト設定では読み込まれないため削除した。記録詳細ページの本文は `prose` クラスで整形している。

### GPX地図表示（未着手・今後の方針）

v1では地図表示を後回しにし、まず一覧・詳細の記録表示を優先した。実装する際の方針は以下の通り。

- ライブラリ: `react-leaflet`
- タイル: 国土地理院（GSI）の地形図タイル（無料・日本の山岳地形の精度が高いため）
- GPXパース: 依存を増やさず、座標・標高列を取るだけの簡易パーサを自前で用意する想定

## Commands

- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド（`generateStaticParams` により記録詳細ページも静的生成される）
- `npm run start` — 本番ビルドの起動
- `npm run lint` — ESLint実行
