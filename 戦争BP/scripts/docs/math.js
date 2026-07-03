/**
 * 指定した小数で四捨五入した値を返します
 * @param { number } number 四捨五入する値
 * @param { number } digit 小数第何位を四捨五入するのか
 * @returns { number }
 */

export function setRound(number, digit) {
    const keta = digit - 1
    const suuji = number * 10 ** keta
    const kaketaAtai = Math.round(suuji)
    return kaketaAtai / 10 ** keta
}