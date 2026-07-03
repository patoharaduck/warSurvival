import { world, system } from "@minecraft/server"
import { searchRed, searchBlue, setNameTagColor, removeTeamTagALL } from "../docs/team"

/**
 * チーム分けする関数(赤と青)
 * @argument {import("@minecraft/server").Player[]} player 全てのプレイヤー(配列) 
 */

function setTeam(player) {
    const playerElement = player.length
    const copyPlayers = [...player]
    let first = true
    removeTeamTagALL(player)
    for (let i = 0; i < playerElement; i ++) {
        const RandElement = Math.floor(Math.random() * player.length)
        const numberRandom = Math.floor(Math.random() * 10)
        const selectedPlayer = player[RandElement]

        if (first) {
            selectedPlayer.addTag(numberRandom < 4? `red` : `blue`)
            first = false
        } else if (searchRed(copyPlayers) == searchBlue(copyPlayers)) {
            selectedPlayer.addTag(numberRandom < 4? `red` : `blue`)
        } else {
            selectedPlayer.addTag(searchRed(copyPlayers) < searchBlue(copyPlayers)? `red` : `blue`)
        }
        setNameTagColor(selectedPlayer)
        const targetPlayerIndex = player.findIndex( element => element == selectedPlayer)
        player.splice(targetPlayerIndex, 1)
    }
}

/**
 * スコアボードに人数設定
 * @argument {import("@minecraft/server").Player[]} player 全てのプレイヤー(配列)
 */

function setTeamNumber(player) {
    world.scoreboard.getObjective(`teamNumber`).setScore(`赤チーム`, searchRed(player))
    world.scoreboard.getObjective(`teamNumber`).setScore(`青チーム`, searchBlue(player))
}


system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const { id } = eventData

    if (id == "game:start") {
        setTeam(world.getPlayers())
        setTeamNumber(world.getAllPlayers())
    }
})