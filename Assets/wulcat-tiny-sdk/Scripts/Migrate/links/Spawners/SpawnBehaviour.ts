// namespace game {
//     export class SpawnFilter extends ut.EntityFilter {
//         spawn : game.Spawn
//     }
//     // FIXME: Complete the script
//     export class SpawnBehaviour extends ut.ComponentBehaviour {
//         data : SpawnFilter

//         OnEntityEnable() {
//             let config = game.Service.getConfig(this.world)
//             // let config = game.Service.getConfig(this.world)
//             let screenBound = app.Service.TransformService.getScreenToWorldRect(this.world , game.Service.getCamera())
            

//             // set the min & max x of screen in world position
//             this.data.spawn.minX = screenBound.min.x
//             this.data.spawn.maxX = screenBound.max.x
//             this.data.spawn.minY = screenBound.min.y
//             this.data.spawn.maxY = screenBound.max.y    
//         }

//         OnEntityUpdate() {
//             let config = game.Service.getConfig(this.world)
//             if(!config.active) return

//             let spawn = this.data.spawn        
//             let time = spawn.time 
//             let delay = spawn.delay

//             time -= ut.Time.deltaTime

//             // create point entity after delay
//             if(time < 0) {
//                 // next time to spawn again
//                 time += delay

//                 // get the entity groups to be instantiated
//                 let randEntityGroups = this.data.spawn.spawnEntityGroups
//                 let randPointIndex = app.Mathf.getRandomInt(0 , randEntityGroups.length-1)

//                 if(randPointIndex >= 0) {
//                     // instantiate
//                     let clone = ut.EntityGroup.instantiate(this.world , randEntityGroups[randPointIndex])[0]

//                     // Align the position randomly on sides
//                     if(spawn.spawnHorizontally && spawn.spawnVertically) {
//                         let randPosition = app.Mathf.getRandomInt(0,9) >= 5 ? true : false
//                         if(randPosition) 
//                             this.setPositionHorizontally(clone , spawn)
//                         else 
//                             this.setPositionVertically(clone , spawn)
//                     }
//                     else {
//                         if(spawn.spawnHorizontally) {
//                             this.setPositionHorizontally(clone , spawn)
//                         }
//                         else if (spawn.spawnVertically) {
//                             this.setPositionVertically(clone , spawn)
//                         }
//                     }

//                     // reduce delay every new entity create
//                     if(spawn.exponentialDelay && spawn.delay > spawn.leastDelay)
//                         spawn.delay -= ut.Time.deltaTime
//                 }
//             }
//             spawn.time = time 
//         }

//         setPositionVertically(clone : ut.Entity , spawn : game.Spawn) {

//         }

//         setPositionHorizontally(clone : ut.Entity , spawn : game.Spawn) {
//             let epsilonBoundary = 0.1 ,
//                 signValueMin = app.Mathf.getSign(spawn.minX) , 
//                 signValueMax = app.Mathf.getSign(spawn.maxX)

//             this.world.usingComponentData(clone , [ut.HitBox2D.RectHitBox2D , ut.Core2D.TransformLocalPosition] , (rectHitBox , position)=>{
//                 let box = rectHitBox.box ,
//                     width = box._width/2

//                 let randX = app.Mathf.getRandomFloat(  signValueMin * (Math.abs(spawn.minX) - width - epsilonBoundary) ,
//                                                             signValueMax * (Math.abs(spawn.maxX) - width - epsilonBoundary) )

//                 position.position = new Vector3(randX , position.position.y)
//             })

//             this.world.usingComponentData(clone , [ut.Physics2D.BoxCollider2D , ut.Core2D.TransformLocalPosition] , (boxCollider , position)=>{
//                 let size = boxCollider.size ,
//                     width = size.x/2

//                 let randX = app.Mathf.getRandomFloat(  signValueMin * (Math.abs(spawn.minX) - width - epsilonBoundary) ,
//                                                             signValueMax * (Math.abs(spawn.maxX) - width - epsilonBoundary) )

//                 position.position = new Vector3(randX , position.position.y)
//             })
//         }
//     }
// }