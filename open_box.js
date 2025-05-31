const {getResponse, getEvent, sleep, getCfg} = require("./utils.js")

const open_box = async (api, xAuth) => {
    var body = JSON.stringify({id: "box-1132fa56-1032-4445-bca5-57f0fe445daa"})
    var res = await getResponse(`${api}/event/game/openBox`, "POST", body, xAuth)
    var json = await res.json()
    if(!json.success) {
        throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json
}

const main = async ([type, count]) => {
    const {api, xAuth} = getCfg(type)
    const COST = 10;
    var eventJson = await getEvent(api, xAuth)
    var tries = eventJson.game.user.tries;
    if(tries < COST) throw `Need more tries (${tries}/${COST}) ...`
    var gifts = []
    var giftCount = 0
    while(true) {
        var gift = (await open_box(api, xAuth)).gift
        tries = gift.type == "GAME_LIVE" ? tries + Number(gift.value) - COST : tries - COST
        var giftTitle = gift.title
        var giftIndex = gifts.findIndex(el => el.id === giftTitle)
        if(!giftIndex) {
            gifts[giftIndex].count = gifts[giftIndex].count + 1
        } else {
            gifts.push({title: giftTitle, count: 1})
        }
        giftCount += 1
        if(tries < COST || count ? giftCount == count : false) break
        await sleep(1500)
    }
    console.log(`${new Date()} ... open_box_${type} ... ${giftCount} ...`, gifts)
    console.log(`Total Gift ... ${giftCount} ...`)
}

main(process.argv.slice(2))