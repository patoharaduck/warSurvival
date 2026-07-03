# 戦争や!BP

Minecraft: Bedrock Edition 用のビヘイビアパック（BP）です。
プレイヤーを赤チーム・青チームの2チームに自動で振り分け、チーム対抗のPvPを行うためのゲーム要素を追加します。

## 特徴

- `game:start` スクリプトイベントを実行するだけで、オンライン中の全プレイヤーをランダムに赤・青2チームへ自動振り分け
- チームの人数差ができるだけ出ないように調整しながら割り振り
- 味方同士（同じチームタグを持つプレイヤー同士）のダメージを無効化（フレンドリーファイア防止）
- チームに応じてプレイヤー名の色を自動変更（赤チーム: `§c`、青チーム: `§b`）
- スコアボードにチームごとの人数をリアルタイム表示
- チームカラーの建築用ブロック（赤ブロック・青ブロック）を追加

## 動作環境

- Minecraft Bedrock Edition 1.21.0 以上（`min_engine_version`）
- 依存モジュール
  - `@minecraft/server`（beta）
  - `@minecraft/server-ui`（beta）

## パック構成

```
戦争や!BP/
├─ manifest.json           # パック定義（スクリプトモジュール + データモジュール）
├─ entities/
│  └─ player.json          # player エンティティのオーバーライド（ダメージ判定など）
├─ blocks/
│  ├─ redblock.json         # war:redblock（赤チーム用ブロック）
│  └─ blueblock.json        # war:blueblock（青チーム用ブロック）
├─ scripts/
│  ├─ main.js               # スクリプトエントリポイント（現状未実装）
│  └─ player.js             # チーム分け処理・スクリプトイベント購読
└─ docs/
   ├─ team.js               # チーム関連ユーティリティ関数
   └─ math.js               # 四捨五入などの数値ユーティリティ
```

## 各ファイルの役割

### `manifest.json`
BPのヘッダー情報と、`scripts/main.js` を JavaScript モジュールのエントリポイントとして登録しています。

### `entities/player.json`
バニラの `minecraft:player` エンティティをオーバーライドし、以下を追加しています。

- `minecraft:damage_sensor`: 攻撃者・被攻撃者が共に `red` タグ、または共に `blue` タグを持つ場合はダメージを無効化
- その他、体力・移動・呼吸・乗り物などバニラ相当の基本コンポーネント一式

### `blocks/redblock.json` / `blueblock.json`
チームカラーの建築ブロックです。両ブロックとも、破壊時間5秒・爆発耐性100（非常に硬い）に設定されています。

### `docs/team.js`
チーム関連の共通処理をまとめたユーティリティです。

| 関数 | 内容 |
| --- | --- |
| `searchRed(player)` | `red` タグを持つプレイヤー数を取得 |
| `searchBlue(player)` | `blue` タグを持つプレイヤー数を取得 |
| `setNameTagColor(player)` | タグに応じて名前の色を赤/青に変更 |
| `removeTeamTagALL(players)` | 全プレイヤーからチームタグ（`red`/`blue`）を除去 |

### `docs/math.js`

| 関数 | 内容 |
| --- | --- |
| `setRound(number, digit)` | 指定した桁数で四捨五入した値を返す |

### `scripts/player.js`
チーム分けのメインロジックです。

- `setTeam(player)`: 全プレイヤーのチームタグを一度リセットした上で、1人ずつランダムに赤/青へ振り分け。既に振り分けたチームの人数差を見ながら、少ない方のチームへ寄せるバランス調整あり
- `setTeamNumber(player)`: スコアボードオブジェクティブ `teamNumber` に、`赤チーム`／`青チーム` の人数をセット
- `system.afterEvents.scriptEventReceive` を購読し、`game:start` イベント受信時に上記2つの処理を実行

## 使い方

1. あらかじめスコアボードオブジェクティブ `teamNumber` を作成しておきます。

   ```
   /scoreboard objectives add teamNumber dummy
   ```

2. ワールドにBPを適用した状態で、以下のコマンドを実行するとチーム分けが行われます。

   ```
   /scriptevent game:start
   ```

3. チーム分け後、赤/青タグを持つプレイヤー同士のPvPダメージは無効化され、名前の色も自動で変わります。

## 既知の注意点・TODO

- `scripts/main.js` は現状中身が空です。`player.js` 側の `scriptEventReceive` 購読処理が実際に読み込まれるよう、`main.js` からのインポート（またはビルド設定）を確認・実装する必要があります。
- `scripts/player.js` 内の `import ... from "../docs/team"` は、`math.js` の関数（`setRound`）を利用していません。将来的にスコア計算などで使う場合は `docs/math.js` の関数を組み込んでください。
- ブロックの `explosion_resistance` が100と非常に高いため、意図した数値か確認してください。

## ライセンス

MIT


## THANKS

claude AI
