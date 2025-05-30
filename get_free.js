import {getResponse, getEvent, sleep, getCfg} from './utils.js'

const getFree = async (api, xAuth) => {
    var res = await getResponse(`${api}/event/getFree`, "POST", null, xAuth)
    var json = await res.json()
    if(json.error == "unauthenticated") throw `Unauthenticated ...`
    return json
}

const main = async type => {
    const {api, xAuth} = getCfg(type)
    while(true) {
        var eventJson = await getEvent(api, xAuth);
        var countdown = eventJson.game.user.countdown
        if(countdown == 0) {
            countdown = eventJson.game.user.countdownDefault
            await getFree(api, xAuth)
        }
        console.log(`${new Date()} ... get_free_${type} ... sleep ${countdown} sec ...`)
        await sleep(countdown * 1000 + 2000)
    }
}

main(process.argv.slice(2))