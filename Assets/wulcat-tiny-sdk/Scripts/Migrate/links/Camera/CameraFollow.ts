// namespace game {
//     // NOTE: Work in progress
//     export class CameraFollow extends ut.ComponentSystem {
//         OnUpdate() : void {
                // if(game.Service.isPaused) return
//             this.world.forEach([game.CameraTag , ut.Entity , game.CameraFollowData , ut.Core2D.TransformLocalPosition] , (tag , entity , data , position)=>{
//                 let targetPosition = this.world.getComponentData(data.target , ut.Core2D.TransformLocalPosition).position

//                 // NOTE: SOMETHING ELSE WAS ALSO CONTANSTATNLY SETTING THE VALUE IN OTHER FRAME TO PLAYERS POSITION
//                 // damm this added a eruption effect on camera
//                 // position.position = new Vector3(targetPosition.x + data.bound.width, targetPosition.y + data.bound.height)

//                 position.position = position.position.lerp(new Vector3(targetPosition.x + data.bound.width , position.position.y) , ut.Time.deltaTime * data.followSpeed)
//                 data.followSpeed += ut.Time.deltaTime / 10
//             })
//         }
//     }
// }