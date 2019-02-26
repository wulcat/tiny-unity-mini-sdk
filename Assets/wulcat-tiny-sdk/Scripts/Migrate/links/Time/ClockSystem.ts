// namespace game {
//     export class ClockSystem extends ut.ComponentSystem {
//         OnUpdate() : void {
//             let config = this.world.getConfigData(game.Configuration)
//             if(!config.active) {
//                 ut.Time.reset()
//                 return
//             }

//             this.world.forEach([game.Clock] , (clock)=>{
//                 let time = clock.time 

//                 let angle = 360/time
//                 angle *= (time-ut.Time.time)
//                 angle *= Math.PI/180

//                 // On Second'ss Hand
//                 let secondHand = clock.secondHand ,
//                     rotation = this.world.getComponentData(secondHand , ut.Core2D.TransformLocalRotation)

//                 rotation.rotation = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), angle)
//                 this.world.setComponentData(secondHand , rotation)

//                 // Once the game is over
//                 if(ut.Time.time > time) {
//                     config.active = false
//                     ut.EntityGroup.instantiate(this.world , "game.OnEndGroup")
//                     setTimeout((world : ut.World)=>{
//                         ut.EntityGroup.destroyAll(world , "game.Block")
//                         ut.EntityGroup.destroyAll(world , "game.Clock")
//                         // ut.EntityGroup.destroyAll(world , "game.MainGroup")
//                     } , 10 , this.world)
//                 }
//             })

//             this.world.setConfigData(config)
//         }
//     }
// }