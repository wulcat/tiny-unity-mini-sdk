function onQuitAndroid(gameTime) {
    try {
        handler.onQuit("")    
    }
    catch (e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}

function onLoadAndroid(assetLength=0) {
    try {
        handler.onLoad(assetLength)
    }
    catch(e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}

function onDownloadCompleteAndroid() {
    try {
        handler.onDownloadComplete("")
    }
    catch(e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}