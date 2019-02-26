// namespace game {
//     export class CustomPhysics2DFilter extends ut.EntityFilter {
//         rigidbody : game.CustomRigidbody2D
//         position : ut.Core2D.TransformLocalPosition
//         rotation : ut.Core2D.TransformLocalRotation
//     }

//     export class CustomPhysics2DBehaviour extends ut.ComponentBehaviour {
//         data : CustomPhysics2DFilter

//         OnEntityUpdate() :void {
//             let localPosition = this.data.position.position

//             let rigidbody = this.data.rigidbody ,
//                 localVelocity = rigidbody.velocity

//             // Add Gravity
//             localVelocity.y += rigidbody.gravity * ut.Time.deltaTime

//             // Apply the Velocity
//             this.data.position.position = localPosition.add(localVelocity)

//             // Appy Mass value & Reset the Velocity after reaching certain Epsilon Point
//             if(localVelocity.x > 0) {
//                 localVelocity.x -= ut.Time.deltaTime * rigidbody.mass * ut.Time.deltaTime
//                 if(localVelocity.x < 0) localVelocity.x = 0
//             }
//             else if(localVelocity.x < 0) {
//                 localVelocity.x += ut.Time.deltaTime * rigidbody.mass * ut.Time.deltaTime
//                 if(localVelocity.x > 0) localVelocity.x = 0
//             }

//             if(localVelocity.y > 0) {
//                 localVelocity.y -= ut.Time.deltaTime * rigidbody.mass * ut.Time.deltaTime
//                 if(localVelocity.y < 0) localVelocity.y = 0
//             }
//             else if(localVelocity.y < 0) {
//                 localVelocity.y += ut.Time.deltaTime * rigidbody.mass * ut.Time.deltaTime
//                 if(localVelocity.y > 0) localVelocity.y = 0
//             }

//         }
//     }
// }