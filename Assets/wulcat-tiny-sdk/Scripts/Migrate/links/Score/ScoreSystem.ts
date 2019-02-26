namespace game {
    export class ScoreSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            let config = this.world.getConfigData(game.Configuration)
            if(!config.init) return

            let record = game.Service.getRecord()
            this.world.forEach([game.ScoreTag , ut.Text.Text2DRenderer] , (tag , renderer)=>{
                renderer.text = "Score : "+record.score.toString()
            })

            this.world.setConfigData(config)
        }
    }
}