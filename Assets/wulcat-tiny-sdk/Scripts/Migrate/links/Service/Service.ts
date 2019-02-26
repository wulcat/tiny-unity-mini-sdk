namespace game {
    @ut.requiredComponents(game.Record)
    export class Service {
        private static world : ut.World
        private static record : ut.Entity
        private static camera : ut.Entity

        static getWorld() { 
            return game.Service.world
        }
        static getCamera() {
            return game.Service.camera
        }
        // If it already exists it destroys it and creates new .
        // Use full for initializing method or restarting the game
        static createRecord() : game.Record {
            let world = game.Service.world

            ut.EntityGroup.destroyAll(world , "game.RecordGroup")
            game.Service.record = null
            game.Service.record = ut.EntityGroup.instantiate(world , "game.RecordGroup")[0]

            return world.getComponentData(game.Service.record , game.Record)
        }

        static getRecord() : game.Record {
            let world = game.Service.world

            if(!world.exists(game.Service.record)) {
                game.Service.record = world.getEntityByName("Record")
                if(game.Service.record == null || game.Service.record.isNone()) {
                    game.Service.record == null
                }
            }
            return world.getComponentData(game.Service.record , game.Record)
        }

        static setRecord(data : game.Record) {
            let world = game.Service.world

            if(!world.exists(game.Service.record)) {
                game.Service.record = world.getEntityByName("Record")
                if(game.Service.record == null) {
                    game.Service.record = null
                    return null
                }
            }
            world.setComponentData(game.Service.record , data)
            return data
        }

        // Method returns the entity is present in current world
        static exists(world : ut.World , entity : ut.Entity) {
            if(entity.isNone() || entity.index == 0 || entity.version == 0) return false
            if(!world.exists(entity)) return false
            return true
        }

        static sameEntity(one : ut.Entity , two : ut.Entity) {
            if(one.index == two.index && one.version == two.version) return true
            return false
        }

        // Custom methods to make it simple
        // modify this (0.0)
        static getConfig(world:ut.World) : game.Configuration {
            game.Service.world = world
            game.Service.camera = world.getEntityByName("Camera")
            return world.getConfigData(game.Configuration)
        }
        static setConfig(config : game.Configuration) {
            game.Service.world.setConfigData(config)
        }

        // Create a good method on this topic
        static mouseButtonDownOnEntity() {
            if (ut.Core2D.Input.getMouseButtonDown(0)) {
                let mousePos = ut.Core2D.Input.getWorldInputPosition(this.world);
                let hit = ut.HitBox2D.HitBox2DService.hitTest(game.Service.world, mousePos, game.Service.camera);
                if(!hit.entityHit.isNone()) {
                    return hit.entityHit
                }
            }
            return ut.NONE
        }
        // Create a good method on this topic
        static mouseButtonOnEntity() {
            if(ut.Core2D.Input.isTouchSupported() && ut.Core2D.Input.touchCount() > 0) {
                let touch = ut.Core2D.Input.getTouch(0)
                // switch(touch.phase) {
                    // case ut.Core2D.TouchState.Moved :
                        let touchPos = app.Service.TransformService.getUniversalTouchWorldPosition()
                        let hit = ut.HitBox2D.HitBox2DService.hitTest(game.Service.world, touchPos, game.Service.camera)
                        if(!hit.entityHit.isNone())
                            return hit.entityHit
                        // break
                // }
            }
            else if (ut.Core2D.Input.getMouseButton(0)) {
                let mousePos = ut.Core2D.Input.getWorldInputPosition(this.world);
                let hit = ut.HitBox2D.HitBox2DService.hitTest(game.Service.world, mousePos, game.Service.camera);
                if(!hit.entityHit.isNone())
                    return hit.entityHit
            }
            return ut.NONE
        }

        static showOnEndGroup(time : number) {
            setTimeout(()=>{
                ut.EntityGroup.instantiate(this.world , "game.OnEndGroup")
            } , time)
        }
    }
}