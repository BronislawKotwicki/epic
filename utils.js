const cfg = {
    "epicloot": {
        xAuth: "MGNiNzdhNmMxZWU5ZWZmM2NjZDJlYWQzN2I1YzAzNWRkNzc3OTgxMzg2ZGRjMWQ3ZDZiNWQ4N2QxODc4ODRhZUnx5exNmp8cDj7Ro0PfZzWVrtJZUasZ2d3TaH5wePpi%3A16053f371ede8fd3daaab946404e537d9d4c6721bf05a7d51ee5896505d7be9a%3A299f79054e0797e3550d1af5f8d86925944b78cdb431601383b036d4ebf25c51",
        api: "https://epicloot.one/api"
    },
    "epicdrop": {
        xAuth: "OWJlODg2ZDNlY2I5MWU0NjVkM2NlZWI5NGNmMmYxMTM5OTEzMGM0MmQ5ZWYyY2NjZjBkZTM2NmNjMGI2NjdhN22T7NpJpr08I%2BdCphvHW5sUsQc%2FLKHEdZjI0YeK0TqD%3A717bcf4adeed7937fd6e4c72181e9379e25be0fdee5c581a06a12dbe79832883%3Ac69f69f6da6a0a52a604cf8138d6d346e25669aab896653394b7261cbe9afc6b",
        api: "https://epicdrop.org/api"
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getResponse = async (url, method, body, xAuth) => {
    return await fetch
    (
        url,
        {
            "headers": {
                "content-type": "application/json",
                "x-auth": xAuth,
                "cookie": `remember_me=${xAuth}`
            },
            "body": body,
            "method": method
        }
    )
}

const getEvent = async (api, xAuth) => {
    var res = await getResponse(`${api}/event`, "GET", null, xAuth)
    var json = await res.json()
    if(json.userAuth == false) throw `Unauthenticated ...`
    return json
}

const getCfg = type => {
    return {
        "api": type == "dota" ? cfg.epicloot.api : cfg.epicdrop.api,
        "xAuth": type == "dota" ? cfg.epicloot.xAuth : cfg.epicdrop.xAuth
    }
}

module.exports = {
    sleep,
    getResponse,
    getEvent,
    getCfg
}