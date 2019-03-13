namespace game {
    export class CrossButtonSystem extends ut.ComponentSystem {
        OnUpdate() :  void {
            // if(game.Service.isPaused) return
            let config = game.Service.getConfig(this.world)

            // Once game time passes 30 secs we set game to complete and pop up a close button
            if(ut.Time.time >= config.taskCompletionTime && !config.complete) {
                config.complete = true
                this.instantiateCrossButtonUI()
            }

            // Animation
            this.animateCrossButtonUI()

            // Apply changes
            game.Service.setConfig(config)
        }

        instantiateCrossButtonUI() {
            ut.EntityGroup.instantiate(this.world , "game.CrossButtonGroup")
            this.world.forEach([game.CrossUITag , ut.Entity , ut.UILayout.RectTransform] , (tag , entity , rect)=>{
                app.UIService.anchorTopRight(this.world , entity , new Vector2(350 , -90) , new Vector2(1,1))
            })
        }
        animateCrossButtonUI() {
            this.world.forEach([ut.Entity , game.CrossUITag , ut.UILayout.RectTransform] , (entity , tag , rect)=>{
                let position = rect.anchoredPosition
                if(tag.showing) {
                    app.UIService.anchorTopRight(this.world , entity , position.lerp(new Vector2(60 , -90) , ut.Time.deltaTime*2) , new Vector2(1,1))
                    if(position.x < 121) {
                        tag.showing = false
                        // Wait for a while before hiding
                        setTimeout(function(entity : ut.Entity){
                            this.world.usingComponentData(entity , [game.CrossUITag] , (tag)=>{
                                tag.hiding = true
                            })
                        }.bind(this) , 1000 , new ut.Entity(entity.index , entity.version))
                    }
                }
                if(tag.hiding) {
                    app.UIService.anchorTopRight(this.world , entity , position.lerp(new Vector2(260 , -90) , ut.Time.deltaTime*2) , new Vector2(1,1))
                    if(position.x > 260 && position.x < 261) {
                        tag.hiding = false
                    }
                }
            })
        }
    }
}