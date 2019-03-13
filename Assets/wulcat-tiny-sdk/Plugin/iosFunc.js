function onQuitiOS() {
    try {
        window.webkit.messageHandlers.onQuit.postMessage("")
    }
    catch (e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}
function onLoadiOS(assetLength=0) {
    try {
        window.webkit.messageHandlers.onLoad.postMessage(assetLength)
    }
    catch (e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}

function onDownloadCompleteiOS() {
    try {
        window.webkit.messageHandlers.onDownloadComplete.postMessage("")
    }
    catch (e) {
        console.error("%c Cross Communication Failed "+e , 'background: #ff0000; color: #ffffff;')
    }
}