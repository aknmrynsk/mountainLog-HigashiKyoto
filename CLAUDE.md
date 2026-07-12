# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトの状態

このリポジトリは現時点で `create-next-app` によって生成された未変更のスキャフォールドです（Next.js 16、App Router、TypeScript、Tailwind CSS v4）。`app/page.tsx` と `app/layout.tsx` にはまだデフォルトのスターターコンテンツが残っており、アプリ固有のコード・ルーティング・テストはまだ存在しません。アーキテクチャ上の規約はまだ確立されていないものとして扱い、現在のファイルに書かれている以上のパターンを勝手に仮定しないこと。

## コマンド

- `npm run dev` — 開発サーバーを起動（http://localhost:3000）
- `npm run build` — 本番ビルド
- `npm run start` — 本番ビルドを起動
- `npm run lint` — ESLint を実行（`eslint.config.mjs` のフラットコンフィグ、`eslint-config-next` の core-web-vitals + typescript ルールを継承）

テストランナーはまだ設定されていない。型チェック専用スクリプトも無いため、必要な場合は `npx tsc --noEmit` を使うこと（`tsconfig.json` は `noEmit: true`、`strict: true`）。

## アーキテクチャ

- Next.js App Router を `app/` 配下で使用。`app/layout.tsx` がルートレイアウト、`app/page.tsx` がホームルート。
- パスエイリアス `@/*` はリポジトリルートを指す（`tsconfig.json`）。
- スタイリングは Tailwind CSS v4（`@tailwindcss/postcss` 経由、`app/globals.css` 参照）であり、`tailwind.config.js` ベースの v3 構成ではない点に注意。
- フォントは `next/font/google`（Geist, Geist Mono）で読み込み、`app/layout.tsx` で CSS 変数として公開している。
