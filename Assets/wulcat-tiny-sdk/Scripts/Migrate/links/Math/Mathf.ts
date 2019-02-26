namespace app {
    export class Mathf {
        static checkFloat(x : number , y : number, delta=1e-10) : boolean {
            return Math.abs(x - y) < delta        
        }
        static getRandomFloat(min : number, max : number) : number {
            return Math.random() * (max - min) + min
        }
        static getRandomInt(min : number, max : number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }
        
        // Shuffling alogrithm => Durstenfeld shuffle : Fisher-Yates
        static shuffleArray<T>(array : T[]) : T[]{
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }

        static toEulerAngle(q : Quaternion) {
            let roll = 0 , pitch = 0 , yaw = 0

            // roll (x-axis rotation)
            let sinr_cosp = +2.0 * (q.w * q.x + q.y * q.z);
            let cosr_cosp = +1.0 - 2.0 * (q.x * q.x + q.y * q.y);
            roll = Math.atan2(sinr_cosp, cosr_cosp);

            // pitch (y-axis rotation)
            let sinp = +2.0 * (q.w * q.y - q.z * q.x);
            if (Math.abs(sinp) >= 1)
                pitch = Math.PI / 2*this.getSign(sinp) // use 90 degrees if out of range
            else
                pitch = Math.asin(sinp);

            // yaw (z-axis rotation)
            let siny_cosp = +2.0 * (q.w * q.z + q.x * q.y);
            let cosy_cosp = +1.0 - 2.0 * (q.y * q.y + q.z * q.z);  
            yaw = Math.atan2(siny_cosp, cosy_cosp)

            return new Vector3(roll , pitch , yaw)
        }

        static getSign(x) {
            return Math.abs(x)/x
        }

        static lookAt2D(target : Vector2 , origin : Vector2) {
            let diff = origin.sub(target)
            diff = diff.normalize()
            
            let rotationZ = Math.atan2(diff.y , diff.x)
            return new Quaternion().setFromEuler(new Euler(0,0,rotationZ - Math.PI/2))

            // -Math.atan2(localPosition.y, localPosition.x) + Math.atan2(mousePosition.y, mousePosition.x)
        }
        static magnitude(vec : Vector3) : number {
            return Math.sqrt(vec.x**2 + vec.y**2 + vec.z**2)
        }

        static angleBetween(vec1 : Vector3, vec2 : Vector3) : number {
            return Math.atan2(vec2.y - vec1.y, vec2.x - vec1.x)  ;
        }

        static crossProduct = (a,b)=> {
            return new Vector3( a.y*b.z - a.z*b.y ,
                                a.z*b.x-a.x*b.z ,
                                a.x*b.y - a.y*b.x )
        }
        static dot(a,b) {
            return a.x*b.x + a.y*b.y
        }
        static direction(a,b) {
            return new Vector3(a.x-b.x , a.y-b.y).normalize()
        }
    }
}