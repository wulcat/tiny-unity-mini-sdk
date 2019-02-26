namespace app.Geometry {
    export class Rect {
        x : number
        y : number
        width : number
        height : number

        constructor(x:number , y:number , width:number , height:number) {
            this.x = x
            this.y = y
            this.width = width 
            this.height = height
        }

        get min() : Vector2 {
            return new Vector2(this.x - this.width/2 , this.y - this.height/2)
        }
        get max() : Vector2 {
            return new Vector2(this.x + this.width/2 , this.y + this.height/2)
        }
    }
}