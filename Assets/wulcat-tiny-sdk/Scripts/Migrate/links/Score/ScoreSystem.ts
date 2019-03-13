namespace game {
    export class ScoreSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            // if(game.Service.isPaused) return
            let config = this.world.getConfigData(game.Configuration)
            if(!config.init) return

            let record = game.Service.getRecord()
            this.world.forEach([game.ScoreTag , ut.Text.Text2DRenderer] , (tag , renderer)=>{
                if(config.active)
                    renderer.text = "  Score : "+record.score.toString()
                else
                renderer.text = record.score.toString()
            })

            this.world.setConfigData(config)
        }
    }
}