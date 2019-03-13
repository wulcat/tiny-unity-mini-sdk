namespace game {
    export class TimerSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            // if(game.Service.isPaused) return
            let config = this.world.getConfigData(game.Configuration)

            if(!config.active) return

            let record = game.Service.getRecord() 

            this.world.forEach([game.Timer , ut.Text.Text2DRenderer] , (timer , renderer)=>{
                let time = timer.time 
                time -=  ut.Time.deltaTime

                // Once the game is over
                if(time <= 0) {
                    record.live = 0
                    time = 0
                }

                renderer.text = time.toFixed(1)+""
                timer.time = time
            })

            game.Service.setRecord(record)
        }
    }
}