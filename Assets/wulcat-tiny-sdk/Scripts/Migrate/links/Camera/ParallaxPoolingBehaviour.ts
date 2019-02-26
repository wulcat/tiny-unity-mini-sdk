// namespace game {
//     @ut.executeAfter(ut.Shared.UserCodeEnd)
//     export class ParallaxPoolingBehaviourFilter extends ut.EntityFilter {
//         tag : game.ParallaxTag
//         parallaxPooling : game.ParallaxPooling
//     }
//     export class ParallaxPoolingBehaviour extends ut.ComponentBehaviour {
//         data : ParallaxPoolingBehaviourFilter

//         OnEntityUpdate() : void {
//             // Get Camera
//             let cameraEntity = this.data.parallaxPooling.cameraEntity ,
//                 cameraPosition = this.world.getComponentData(cameraEntity , ut.Core2D.TransformLocalPosition)

//             // Get List Pooling Entities
//             let poolingEntities = this.data.parallaxPooling.poolingEntities ,
//                 poolingObjectCount = poolingEntities.length

//             for(let i = 0 ; i < poolingObjectCount ; i++) {
//                 let poolingEntity = poolingEntities[i] ,
//                     poolingPosition = this.world.getComponentData(poolingEntity , ut.Core2D.TransformLocalPosition) ,
//                     size = this.world.getComponentData(poolingEntity , ut.Core2D.Sprite2DRendererOptions).size

//                 // if the pooling object behind the camera on left
//                 let diffX = Math.abs(poolingPosition.position.x - cameraPosition.position.x)
//                 let diffY = Math.abs(poolingPosition.position.y - cameraPosition.position.y)

//                 // distance between camera and pooling entity is greate than the size of the pooling sprite image
//                 if(this.data.parallaxPooling.horizontalParallax)
//                     if(diffX > size.x) {
//                         // if it is behind shift ahead
//                         if(poolingPosition.position.x < cameraPosition.position.x) {
//                             let position = new Vector3(3*size.x+poolingPosition.position.x , poolingPosition.position.y + 0.01)
//                             poolingPosition.position = position
//                         }
//                         // if it is ahead shift behind
//                         if(poolingPosition.position.x - size.x > cameraPosition.position.x) {
//                             let position = new Vector3(-3*size.x+poolingPosition.position.x , poolingPosition.position.y - 0.01)
//                             poolingPosition.position = position
//                         }
//                     }
//                 if(this.data.parallaxPooling.verticalParallax)
//                     if(diffY > size.y) {
//                         // if it is below shift top
//                         if(poolingPosition.position.y < cameraPosition.position.y) {
//                             let position = new Vector3(poolingPosition.position.x , 3*size.y+poolingPosition.position.y)
//                             poolingPosition.position = position
//                         }
//                         // if it is above shift bottom
//                         if(poolingPosition.position.y - size.y > cameraPosition.position.y) {
//                             let position = new Vector3(poolingPosition.position.x , -3*size.y+poolingPosition.position.y)
//                             poolingPosition.position = position
//                         }
//                     }
//                 // Set the values
//                 this.world.setComponentData(poolingEntity , poolingPosition)
//             }
//         }
//     }
// }