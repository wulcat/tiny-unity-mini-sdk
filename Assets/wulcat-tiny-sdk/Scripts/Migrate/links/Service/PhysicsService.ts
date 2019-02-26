namespace app.Service {
    export class PhysicsService {
        static addForce(world : ut.World , entity : ut.Entity , velocity : Vector2) {
            if(world.hasComponent(entity , ut.Physics2D.SetVelocity2D)) 
                world.removeComponent(entity , ut.Physics2D.SetVelocity2D)
            let setVelocity = new ut.Physics2D.SetVelocity2D
            setVelocity.velocity = velocity
            world.addComponentData(entity , setVelocity)
        }
        static addImpluse(world : ut.World , entity : ut.Entity , impluse : Vector3) {
            if(world.hasComponent(entity , ut.Physics2D.AddImpulse2D)) 
                world.removeComponent(entity , ut.Physics2D.AddImpulse2D)
            let setImpluse = new ut.Physics2D.AddImpulse2D
            setImpluse.impulse = new Vector2(impluse.x , impluse.y)
            world.addComponentData(entity , setImpluse)
        }
    }
}