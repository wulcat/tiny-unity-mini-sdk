// namespace game {
//     // Re
//     @ut.executeAfter(ut.Shared.UserCodeEnd)
//     export class ParallaxObjectPoolingBehaviourFilter extends ut.EntityFilter {
//         tag : game.ParallaxTag
//         entity : ut.Entity
//         parallaxObjectPooling : game.ParallaxObjectPooling
//     }

//     export class ParallaxObjectPoolingBehaviour extends ut.ComponentBehaviour {
//         data : ParallaxObjectPoolingBehaviourFilter

//         OnEntityUpdate() : void {

//             let target = this.data.parallaxObjectPooling.cameraEntity ,
//                 bounds = app.Service.TransformService.getScreenToWorldRect(this.world , target)

//             let poolingEntities = this.data.parallaxObjectPooling.poolingEntities ,
//                 poolingEntityCount = poolingEntities.length
            
//             let poolingEntity = poolingEntities[0] , 
//                 size = this.world.getComponentData(poolingEntity , ut.Physics2D.BoxCollider2D).size ,
//                 poolingEntityPosition = this.world.getComponentData(poolingEntity , ut.Core2D.TransformLocalPosition) ,
//                 poolingEntityLocalPosition = poolingEntityPosition.position

//             if(bounds.x - bounds.width > poolingEntityLocalPosition.x) {
//                 let lastpoolingEntityPosition = this.world.getComponentData(poolingEntities[poolingEntityCount-1] , ut.Core2D.TransformLocalPosition)

//                 this.data.parallaxObjectPooling.poolingEntities.shift()
//                 this.data.parallaxObjectPooling.poolingEntities.push(poolingEntity)

//                 poolingEntityLocalPosition = new Vector3(lastpoolingEntityPosition.position.x + size.x + app.Mathf.getRandomFloat(2,4) , poolingEntityLocalPosition.y)
//                 poolingEntityPosition.position = poolingEntityLocalPosition
//                 this.world.setComponentData(poolingEntity , poolingEntityPosition)
//             }

//             this.world.setComponentData(this.data.entity , this.data.parallaxObjectPooling)
//         }
//     }
// }


