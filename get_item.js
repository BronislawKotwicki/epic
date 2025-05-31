const {getResponse, getEvent, sleep, getCfg} = require("./utils.js")

const getItem = async (api, xAuth) => {
    var res = await getResponse(`${api}/event/game/getItem`, "POST", null, xAuth)
    var json = await res.json()
    if(!json.success) {
        throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json
}

const start = async (api, xAuth, item, drops) => {
    var body =  JSON.stringify({type: "UNBROKEN", item: item, drops: drops})
    var res = await getResponse(`${api}/event/game/workbench/start`, "POST", body, xAuth)
    var json = await res.json()
    if(!json.success) {
        throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json
}

const items = async (api, xAuth, price) => {
    var res = await getResponse(`${api}/event/game/workbench/items?price_min=${price}`, "GET", null, xAuth)
    var json = await res.json()
    if(!json.success) {
         throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json.items
}

const main = async type => {
    const {api, xAuth} = getCfg(type)
    while(true) {
        var eventJson = await getEvent(api, xAuth)
        var inventory = eventJson.game.inventory
        var lockedSlots = inventory.length
        if(eventJson.game.user.unlockedSlots == lockedSlots) {
            while(lockedSlots) {
                var startItem = inventory.shift()
                var startItemPrice = startItem.item.price
                var endItem = (await items(api, xAuth, startItemPrice * 6))[0]
                var json = await start(api, xAuth, endItem.id, [startItem.id])
                console.log(`${new Date()} ... upgrade_${type} ${startItemPrice}/${endItem.price} ... ${json.upgraded} ...`)
                lockedSlots = lockedSlots - 1
            }
        }
        var countdown = eventJson.game.generator.countdown
        if(countdown == 0) {
            countdown = eventJson.game.generator.countdownDefault
            await getItem(api, xAuth)
        }
        console.log(`${new Date()} ... get_item_${type} ... sleep ${countdown} sec ...`)
        await sleep(countdown * 1000 + 2000)
    }
}

main(process.argv.slice(2))