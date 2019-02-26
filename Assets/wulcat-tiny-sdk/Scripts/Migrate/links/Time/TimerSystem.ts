// namespace game {
//     export class TimerSystem extends ut.ComponentSystem {
//         OnUpdate() : void {
//             let config = this.world.getConfigData(game.Configuration)
//             if(!config.active) {
//                 ut.Time.reset()
//                 return
//             }

//             this.world.forEach([game.Timer , ut.Text.Text2DRenderer] , (timer , renderer)=>{
//                 let time = timer.time 

//                 let currentTime = time - ut.Time.time
//                 renderer.text = parseInt(currentTime.toString()).toString()
//                 // Once the game is over
//                 if(currentTime <= 0) {
//                     config.active = false
//                     ut.EntityGroup.instantiate(this.world , "game.OnEndGroup")
//                     ut.EntityGroup.destroyAll(this.world , "game.MainGroup")
//                 }
//             })

//             this.world.setConfigData(config)
//         }
//     }
// }