namespace app {
    export class Communication {
        static getMobileOperatingSystem() : string{
            var userAgent = navigator.userAgent || navigator.vendor //|| window.opera;
        
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                return "Windows Phone";
            }
            else if (/android/i.test(userAgent)) {
                return "Android";
            }
            else if(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
                return "iOS"
            }

            // // iOS detection from: http://stackoverflow.com/a/9039885/177710
            // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //     return "iOS";
            // }
            return "unknown";
        }
        static createFunc(func : string , ...data : string[]) {
            let createCall = func +"("

            for(let i = 0 ; i < data.length ; i++) {
                if(i!=0) createCall += ","
                createCall += "data["+i+"]"
            }
            createCall += ")"

            return createCall
        }
       
        static sendMessage(func : string , ...data : string[]) {
            let createCall = ""
            switch(this.getMobileOperatingSystem()) {
                case "Android" :
                    func += "Android"
                    createCall = this.createFunc(func ,...data)    
                    eval(createCall)
                    break
                case "iOS" :
                    func += "iOS"
                    createCall = this.createFunc(func, ...data)    
                    eval(createCall)
                    break
                default :
                    console.warn("%c No Cross Communication Allowed" , 'background: #ffcc00; color: #ffffff')
                    break
            }
        }
    }
    
}