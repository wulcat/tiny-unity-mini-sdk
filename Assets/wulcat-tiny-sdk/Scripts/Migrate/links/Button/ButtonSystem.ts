namespace game {
    export class ButtonSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            let config = game.Service.getConfig(this.world)
            this.world.forEach([game.StartTag , ut.UIControls.MouseInteraction] , (tag , interaction)=>{
                if(interaction.clicked) {
                    ut.EntityGroup.destroyAll(this.world , "game.OnStartGroup")
                    config.active = true
                }
            })
            this.world.forEach([game.RestartTag , ut.UIControls.MouseInteraction] , (tag , interaction)=>{
                if(interaction.clicked) {
                    ut.EntityGroup.destroyAll(this.world , "game.OnEndGroup")
                    config.init = false
                }
            })

            game.Service.setConfig(config)
        }
    }
}

