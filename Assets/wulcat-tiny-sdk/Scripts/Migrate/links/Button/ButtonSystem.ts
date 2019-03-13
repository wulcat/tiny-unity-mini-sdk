namespace game {
    export class ButtonSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            if(game.Service.isPaused) return
            
            let config = game.Service.getConfig(this.world)
            // Start Game
            this.world.forEach([game.StartTag , ut.UIControls.MouseInteraction] , (tag , interaction)=>{
                if(interaction.clicked) {
                    if(config.loaded) {
                        ut.EntityGroup.destroyAll(this.world , "game.OnStartGroup")
                        // Set game to interactable
                        config.playable = true
                        config.uiState = game.GameUIStateEnum.tutorial
                        console.log("%c Tutorial Screen" , 'background: #33ccff; color: #ffffff')
                    }
                }
            })
            // Restart Game
            this.world.forEach([game.RestartTag , ut.UIControls.MouseInteraction] , (tag , interaction)=>{
                if(interaction.clicked) {
                    config.init = false
                    config.playable = true

                    let playableUpdateLoop = function() {
                        config = game.Service.getConfig(this.world)
                        if(config.init) {
                            config.playable = true
                            config.uiState = game.GameUIStateEnum.tutorial
                            console.log("%c Tutorial Screen" , 'background: #33ccff; color: #ffffff')
                            game.Service.setConfig(config)
                        }
                        else 
                            setTimeout(playableUpdateLoop , 10)
                    }.bind(this)

                    setTimeout(playableUpdateLoop , 400)
                }
            })
            
            // Finish Game
            this.world.forEach([game.CloseTag , ut.UIControls.MouseInteraction] , (tag , interaction)=>{
                if(interaction.clicked) {
                    // Kill the game
                    app.Communication.sendMessage("onQuit")
                }
            })

            // Start the game after intial demo for how to play
            if(config.init && !config.active && config.playable) {
                if(ut.Core2D.Input.isTouchSupported() && ut.Core2D.Input.touchCount() > 0) {
                    let touch = ut.Core2D.Input.getTouch(0)
                    switch(touch.phase) {
                        case ut.Core2D.TouchState.Began :
                            this.Start(config)
                            break
                    }
                }
                else if(ut.Core2D.Input.getMouseButtonDown(0)) {
                    this.Start(config)
                }
            }

            game.Service.setConfig(config)
        }

        Start(config : game.Configuration) {
            config.active = true
            config.uiState = game.GameUIStateEnum.NONE
            console.log("%c Empty Screen" , 'background: #33ccff; color: #ffffff')
            ut.EntityGroup.destroyAll(this.world , "game.GameDemoGroup")
        }
    }
}

