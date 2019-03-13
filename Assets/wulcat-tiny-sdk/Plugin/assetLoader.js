// Once streaming is complete send the response to Webview to remove the loading bar
let updateRate = 1000/30

function loadGame() {
    let config = game.Service.getConfig(game.Service.getWorld())
    config.loaded = true
    game.Service.setConfig(config)

    app.Communication.sendMessage("onDownloadComplete")
}

// Start the streaming of assets and save the referneces in configuration
function downloadAssets(json) {
    if(!json) return

    let config = game.Service.getConfig(game.Service.getWorld())
    console.log("%c Download Started" , 'background: #00cc00; color: #ffffff')

    let data = JSON.parse(json).data

    // Send number downloads to be done for calulcating loading screen
    app.Communication.sendMessage("onLoad" , (data.length-1)+"")

    for(let i = 0 ; i < data.length ; i++) {
        config.stream_sprites.push(game.Service.downloadImage(data[i].name , data[i].url))
    }

    game.Service.setConfig(config)

    checkStreamingStatus()
}

// A function in loop to check if all assets are streamed
// Async download files one by one to send responce for loading screen
function checkStreamingStatus() {
    let loaded = game.Service.getAssetStatus()

    if(loaded) {
        console.log("%c Download Complete" , 'background: #00cc00; color: #ffffff')
        loadGame()
        return
    }
    setTimeout(checkStreamingStatus , updateRate)
}

// Asset json fetch
try {
    let stream_data_element = document.getElementById("stream_data").value  
    downloadAssets(stream_data_element)
}
catch(e) {
    console.error("%c Download Failed. Loaded Internal Assets. "+e , 'background: #ff0000; color: #ffffff;')
    app.Communication.sendMessage("onLoad" , "0")
    loadGame()
}