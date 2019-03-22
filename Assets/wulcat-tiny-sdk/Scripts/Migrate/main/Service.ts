namespace game {
    interface Callback { (): void }
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

        // s// use this method for in game pause
        // private static _isPaused : boolean //= true
        // static get isPaused() : boolean {
        //     return this.world.scheduler().isPaused()
        // }

        // static set setPause(value : boolean) {
        //     console.log("%c Pause Status : "+this.world.scheduler().isPaused() , 'background: #33ccff; color: #ffffff')

        //     if(this.world.scheduler().isPaused())
                
        //     else
                
        // }
        static pause() {
            console.log("%c Pause Status : true", 'background: #33ccff; color: #ffffff')
            this.world.scheduler().pause()
        }
        static resume() {
            console.log("%c Pause Status : false", 'background: #33ccff; color: #ffffff')
            this.world.scheduler().resume()
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
                    this.createRecord()
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

        
        // public Callback: (name:string) => void
        
        static addExplicitScript(src: string , callback : Callback) {
            var script = document.createElement('script')
            script.setAttribute( 'src', src )
            
            script.addEventListener('load' , function(event) {
                callback()
            } , false)

            document.body.appendChild(script)
        }

        // CREATE A METHOD TO REVERT ON ERROR
        // FILES USED : assetLoader.js => checkStreamingStatus()
        static getAssetStatus() {
            let downloaded = true ,
                error = false

            this.world.forEach([ut.Core2D.Image2D] , (image)=>{
                switch(image.status) {
                    case ut.Core2D.ImageStatus.Loaded :
                        downloaded = false
                        break
                    case ut.Core2D.ImageStatus.LoadError :
                        console.warn("%c Load Error : "+image.sourceName , 'background: #ffcc00; color: #ffffff')
                        error = true
                        break
                }
            })
            
            if(error) {
                // api call to server on asset loading error
                
                // unload the assets
                this.world.forEach([ut.Entity , game.StreamAssetTag] , (entity , tag)=>{
                    this.world.destroyEntity(entity)
                })
                let config = game.Service.getConfig(this.world)
                config.stream_sprites.length = 0
                game.Service.setConfig(config)
            }
            return downloaded
        }

        static downloadImage(name : string , url : string) : ut.Entity {
            // Create Holder
            let holder = this.world.createEntity()
            this.world.setEntityName(holder , name+"_Holder")
            this.world.addComponent(holder , ut.Core2D.TransformNode)
            this.world.addComponent(holder , game.StreamAssetTag)

            // Create Texture Entity
            let texture2D = this.world.createEntity()
            this.world.setEntityName(texture2D , name+"_texture2D") 
            this.world.addComponent(texture2D , ut.Core2D.Image2DLoadFromFile)
            this.world.usingComponentData(texture2D , [ut.Core2D.TransformNode , ut.Core2D.Image2DLoadFromFile] , (node , file)=>{
                node.parent = holder
                file.imageFile = url
            })
            // Load Texture Entity
            this.world.addComponent(texture2D , ut.Core2D.Image2D)

            // Create Sprite Entity
            let sprite2D = this.world.createEntity()
            this.world.setEntityName(sprite2D , name+"_sprite2D")
            this.world.addComponent(sprite2D , ut.Core2D.Sprite2D)
            this.world.usingComponentData(sprite2D , [ut.Core2D.TransformNode , ut.Core2D.Sprite2D] , (node , sprite)=>{
                node.parent = holder
                sprite.image = texture2D
                sprite.pivot = new Vector2(0.5,0.5)
            })
            return new ut.Entity(sprite2D.index , sprite2D.version)
        }

        static instantiateAndLoadAssets(name : string) {
            ut.EntityGroup.instantiate(this.world , name)
            let config = game.Service.getConfig(this.world)
            let lengthSprites = config.stream_sprites.length

            if(lengthSprites <= 0) return
            
            this.world.forEach([ut.Entity , game.DownloadOnLoad] , (entity , tag)=>{
                let entityName = this.world.getEntityName(entity)
                entityName += "_sprite2D"
                for(let i = 0 ; i < lengthSprites ; i++) {
                    let streamSprite = config.stream_sprites[i]
                    let streamSpriteName = this.world.getEntityName(streamSprite)

                    // Find the image from pool of downloaded objects and replace the downloaded asset
                    if(entityName == streamSpriteName) {
                        this.world.usingComponentData(entity , [ut.Core2D.Sprite2DRenderer] , (renderer)=>{
                            let pixelsToWorldUnits : number
                            let pixelSize : Vector2
                            // Grab the original pixel Units and ratio
                            this.world.usingComponentData(renderer.sprite , [ut.Core2D.Sprite2D] , (sprite)=>{
                                this.world.usingComponentData(sprite.image , [ut.Core2D.Image2D] , (image)=>{
                                    pixelsToWorldUnits = image.pixelsToWorldUnits
                                    pixelSize = image.imagePixelSize
                                })
                            })
                            // Assign the grabbed value
                            this.world.usingComponentData(streamSprite , [ut.Core2D.Sprite2D] , (sprite)=>{
                                this.world.usingComponentData(sprite.image , [ut.Core2D.Image2D] , (image)=>{
                                    image.pixelsToWorldUnits = pixelsToWorldUnits
                                    image.imagePixelSize = pixelSize
                                })
                            })
                            renderer.sprite = streamSprite
                        })
                        break
                    }
                }
            })
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

    }
}