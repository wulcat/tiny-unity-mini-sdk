namespace game {
    export class StaticForce2DFilter extends ut.EntityFilter {
        position : ut.Core2D.TransformLocalPosition
        force : game.StaticForce2D
    }
    export class StaticForce2DBehaviour extends ut.ComponentBehaviour {
        data : StaticForce2DFilter 

        OnEntityUpdate() {
            let localPosition = this.data.position.position ,
                localVelocity = new Vector3(this.data.force.velocity.x , this.data.force.velocity.y)

            localVelocity = localPosition.add(localVelocity.multiplyScalar(ut.Time.deltaTime))
            
            this.data.position.position = localVelocity
        }
    }
}