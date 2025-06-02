const {getResponse, getEvent, sleep, getCfg} = require("./utils.js")

const getFree = async (api, xAuth) => {
    var res = await getResponse(`${api}/event/getFree`, "POST", null, xAuth)
    var json = await res.json()
    if(json.error == "unauthenticated") throw `Unauthenticated ...`
    return json
}

const start = async (api, xAuth) => {
    var res = await getResponse(`${api}/event/game/start`, "POST", null, xAuth)
    var json = await res.json()
    if(!json.success) {
        throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json
}

const action = async (api, xAuth, id, x) => {
    var body =  JSON.stringify({id: id, x: x, y: 1})
    var res = await getResponse(`${api}/event/game/action`, "POST", body, xAuth)
    var json = await res.json()
    if(!json.success) {
        throw json.error ? json.error : `Unsuccessfully ...`
    }
    return json
}

const main = async type => {
    const {api, xAuth} = getCfg(type)
    while(true) {
        var eventJson = await getEvent(api, xAuth)
        var countdown = eventJson.game.user.countdown
        var tries = eventJson.game.user.tries
        if(countdown == 0) {
            countdown = eventJson.game.user.countdownDefault
            await getFree(api, xAuth)
            tries += 1
            while(tries != 0) {
                tries -= 1
                var id = (await start(api, xAuth)).id
                var dead = false
                var ended = false
                var x = 0
                console.log(id)
                while(!dead && !ended) {
                    x += 1
                    var actionJson = await action(api, xAuth, id, x)
                    dead = actionJson.dead
                    ended = actionJson.ended
                    if(ended && actionJson.gift && actionJson.gift.title) {
                        console.log(`${new Date()} ... get_free_${type} ... win ${actionJson.gift.title} ...`)
                    } else {
                        await sleep(1000)
                    }
                }
            }
        }
        console.log(`${new Date()} ... get_free_${type} ... sleep ${countdown} sec ...`)
        await sleep(countdown * 1000 + 500)
    }
}

main(process.argv.slice(2))