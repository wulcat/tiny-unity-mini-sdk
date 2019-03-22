namespace game {
    export class GameSystem extends ut.ComponentSystem {
        OnUpdate():void {            
            let config = game.Service.getConfig(this.world)
            let record = game.Service.getRecord()


            // Once all of lives are finished
            if(record.live <= 0) {
                if(config.uiState == game.GameUIStateEnum.complete || config.uiState == game.GameUIStateEnum.failure) return

                if(config.complete) {
                    console.log("%c Complete Screen" , 'background: #33ccff; color: #ffffff')
                    this.onSuccess(config)
                }
                else {
                    console.log("%c Failure Screen" , 'background: #33ccff; color: #ffffff')
                    this.onFailure(config)
                }
            }


            game.Service.setRecord(record)
            game.Service.setConfig(config)
        }

        onSuccess(config : game.Configuration) {
            config.active = false
            config.playable = false
            config.uiState = game.GameUIStateEnum.complete

            setTimeout(()=>{
                ut.EntityGroup.instantiate(this.world , "game.OnEndGroup")
            } , 1000)
        }

        onFailure(config : game.Configuration) {
            if(config.uiState == game.GameUIStateEnum.complete || config.uiState == game.GameUIStateEnum.failure) return

            config.active = false
            config.playable = false
            config.uiState = game.GameUIStateEnum.failure

            setTimeout(()=>{
                ut.EntityGroup.instantiate(this.world , "game.OnFailGroup")
            },1000)
        }
    }
}