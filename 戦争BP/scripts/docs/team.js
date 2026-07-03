/**
 * チームの人数取得(赤)
 * @argument {import("@minecraft/server").Player[]} player 対象のプレイヤー
 * @returns {number}
 */

export function searchRed(player) {
    return player.filter(element => element.hasTag(`red`)).length
}

/**
 * チームの人数取得(青)
 * @argument {import("@minecraft/server").Player[]} player 対象のプレイヤー
 * @returns {number}
 */

export function searchBlue(player) {
    return player.filter(element => element.hasTag(`blue`)).length
}

/**
 * プレイヤーの名前の色変更
 * @argument {import("@minecraft/server").Player} player 対象のプレイヤー
 */

export function setNameTagColor(player) {
    player.hasTag(`red`)? player.nameTag = `§c${player.name}§r` : player.nameTag = `§b${player.name}§r`
}

/**
 * プレイヤーのチームタグを消します
 * @argument {import("@minecraft/server").Player[]} players 全てのプレイヤー(配列)
 */

export function removeTeamTagALL(players) {
    for (const player of players) {
        player.removeTag(player.hasTag(`red`)? `red` : `blue`)
        player.removeTag(player.hasTag(`blue`)? `blue` : `red`)
    }
}
