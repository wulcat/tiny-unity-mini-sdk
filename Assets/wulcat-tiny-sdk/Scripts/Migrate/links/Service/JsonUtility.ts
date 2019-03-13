namespace ut {
    export class JsonUtility {
        static loadAssetAsync(assetName: string, callback: (error?: any, jsonResponse?: any) => void): void {
            this.loadAsync(UT_ASSETS[assetName], callback);
        }
        static loadAsync(url: string, callback: (error?: any, jsonResponse?: any) => void): void {
            var xobj = new XMLHttpRequest()
            xobj.open('GET', url, true)
       
            xobj.onreadystatechange = ()=>{
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                if (xobj.readyState == 4 && xobj.status == 200) {
                    try {
                        // callback(null , JSON.parse(xobj.responseText))   
                        callback(null , xobj.responseText)   
                    }
                    catch(e) {
                        console.error(e)
                    }
                }
            }
            xobj.send(null)
        }
    }
}