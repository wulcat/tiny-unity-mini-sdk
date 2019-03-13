/* 
This is a hack to work around https://forum.unity.com/threads/bug-renderer-fails-to-take-into-account-screen-dpi.601087/
Instructions:
Put the following code in a Behavior / System which gets included in your game.
Place the code NEXT to your namespace definition i.e...
(function HDPI_Hacks_By_abeisgreat() {
  ...
})();
namespace game {
  ...
}
It should not go inside the namespace.
*/
(function HDPI_Hacks_By_abeisgreat() {
    const w = (window as any);

    const initialize_hack = () => {
        console.log("%c Initializing HDPI hacks" , 'background: #00cc00; color: #ffffff');
        const fakeMouseEventFn = (ev) => {
            const ut_HTML = w.ut._HTML;
            const fakeEvent = {
                type: ev.type,
                pageX: ev.pageX * window.devicePixelRatio,
                pageY: ev.pageY * window.devicePixelRatio,
                preventDefault: () => {},
                stopPropagation: () => {}
            };
            ut_HTML.mouseEventFn(fakeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        };

        const fakeTouchEventFn = (ev) => {
            const ut_HTML = w.ut._HTML;
            const changedTouches = [];
            for (var index = 0; index < ev.changedTouches.length; index++) {
                const touch = ev.changedTouches[index];
                changedTouches.push({
                    identifier: touch.identifier,
                    pageX: touch.pageX * window.devicePixelRatio,
                    pageY: touch.pageY * window.devicePixelRatio
                });
            }
            const fakeEvent = {
                type: ev.type,
                changedTouches,
                preventDefault: () => {},
                stopPropagation: () => {}
            };
            ut_HTML.touchEventFn(fakeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        };

        window.addEventListener("resize", function () {
            const ut = w.ut;

            ut._HTML.onDisplayUpdated(
                window.innerWidth * window.devicePixelRatio,
                window.innerHeight * window.devicePixelRatio,
                window.screen.width * window.devicePixelRatio,
                window.screen.height * window.devicePixelRatio,
                -1);

            ut._HTML.canvasElement.style.width = `${window.innerWidth}px`;
            ut._HTML.canvasElement.style.height = `${window.innerHeight}px`;
            // ut._HTML.canvasElement.style.width = '100%';
            // ut._HTML.canvasElement.style.height = '100%';

            ut._HTML.stopResizeListening();
            const mouseEvents = ["down", "move", "up"];
            const touchEvents = ["touch", "cancel", "move", "start" , "end"];

            mouseEvents.forEach((type) => {
                const eventType = `mouse${type}`;
                ut._HTML.canvasElement.removeEventListener(eventType, fakeMouseEventFn);
                ut._HTML.canvasElement.addEventListener(eventType, fakeMouseEventFn);
            });

            touchEvents.forEach((type) => {
                const eventType = `touch${type}`;
                ut._HTML.canvasElement.removeEventListener(eventType, fakeTouchEventFn);
                ut._HTML.canvasElement.addEventListener(eventType, fakeTouchEventFn);
            });

            setTimeout(function () {
                mouseEvents.forEach((type) => {
                    ut._HTML.canvasElement.removeEventListener(`mouse${type}`, ut._HTML.mouseEventFn);
                });

                touchEvents.forEach((type) => {
                    ut._HTML.canvasElement.removeEventListener(`touch${type}`, ut._HTML.touchEventFn);
                });
            }, 100);
        });
        window.dispatchEvent(new Event("resize"));
    }

    const intervalID = setInterval(() => {
        const w = (window as any);
        const ut = w.ut;
        if (ut._HTML.canvasElement && w.known_ut_HTML !== ut._HTML) {
            w.known_ut_HTML = ut._HTML;
            clearInterval(intervalID);
            initialize_hack();
        }
    }, 10);
})();

window.onblur = ()=>{
    game.Service.setPause = true
    document.title = "blur"
}
window.onfocus = ()=>{
    game.Service.setPause = false
    document.title = "focus"
}

namespace game { 
    export class InitializeSystem extends ut.ComponentSystem {
        OnUpdate() :void {
            // if(game.Service.isPaused) return

            let config = game.Service.getConfig(this.world)
            if(config.init) return

            if(config.loaded) {
                console.log("%c Initializing Game" , 'background: #00cc00; color: #ffffff')

                // initialize system
                let record = game.Service.createRecord()
                if(!record) throw "Error : There was Error finding Record"

                // Initialize the game
                this.initialize(config , record)

                // set initialized & make game playable
                config.init = true
                config.playable = false // this allows user to touch once again after game starts
                game.Service.setRecord(record)
            }
            else if(!config.loading) {
                game.Service.addExplicitScript(UT_ASSETS["androidFunc"] , ()=>{
                    game.Service.addExplicitScript(UT_ASSETS["iosFunc"] , ()=>{
                        game.Service.addExplicitScript(UT_ASSETS["assetLoader"] , ()=>{

                        })
                    })
                })

                config.loading = true
            }
            
            // set the data
            game.Service.setConfig(config)
        }
        
        

        initialize(config : game.Configuration , record : Record):void {
            this.destroy()
            this.instantiate()            
            this.create()
    
            // SOMEHINGS BUGGY
            setTimeout(this.AlignBounds , 2000 , this.world)

            this.world.forEach([game.Timer] , (timer)=>{
                timer.time = config.taskCompletionTime
            })
        }

        // Destroy the groups you have created (this method is usefull when we are restarting game)
        destroy() {
            // Main Groups
            ut.EntityGroup.destroyAll(this.world , "game.MainGroup")            
            ut.EntityGroup.destroyAll(this.world , "game.OnFailGroup")
            ut.EntityGroup.destroyAll(this.world , "game.OnEndGroup")

            // Your Groups
            ut.EntityGroup.destroyAll(this.world , "game.GroundCrackEffectGroup")
            ut.EntityGroup.destroyAll(this.world , "game.BasketSplashEffectGroup")
            ut.EntityGroup.destroyAll(this.world , "game.Danger01Group")
            ut.EntityGroup.destroyAll(this.world , "game.Item01Group")
            ut.EntityGroup.destroyAll(this.world , "game.Item02Group")
        }

        
        // Instantiate required groups .
        instantiate() {
            game.Service.instantiateAndLoadAssets("game.MainGroup")
            game.Service.instantiateAndLoadAssets("game.GameDemoGroup")
        }

        // You custom init
        create() {

        }

        // Not complete . This is used for creating bounds(colliders) on the edges of screen. Comment if not required
        AlignBounds(world : ut.World) {
            world.forEach([ut.Entity , game.Bounds] , (entity , bounds)=>{
                let worldRect = app.Service.TransformService.getScreenToWorldRect(world , entity) ,
                    width = worldRect.width/2 ,
                    height = worldRect.height/2
    
                if(!bounds.top.isNone()) {
                    if(world.hasComponent(bounds.top , ut.HitBox2D.RectHitBox2D)) {
                        let topCollider = world.getComponentData(bounds.top , ut.HitBox2D.RectHitBox2D) ,
                        topPosition = world.getComponentData(bounds.top , ut.Core2D.TransformLocalPosition) ,
                        topLocalPosition = topPosition.position
    
                        topLocalPosition = new Vector3(topLocalPosition.x , height + topCollider.box._height/2)
                        topPosition.position = topLocalPosition
                        world.setComponentData(bounds.top , topPosition)    
                    }
                    else if(world.hasComponent(bounds.top , ut.Physics2D.BoxCollider2D)) {
                        let topCollider = world.getComponentData(bounds.top , ut.Physics2D.BoxCollider2D) ,
                            topPosition = world.getComponentData(bounds.top , ut.Core2D.TransformLocalPosition) ,
                            topLocalPosition = topPosition.position
        
                        topLocalPosition = new Vector3(topLocalPosition.x , height + topCollider.size.y/2)
                        topPosition.position = topLocalPosition
                        world.setComponentData(bounds.top , topPosition)
                    }
                }
    
                if(!bounds.bottom.isNone()) {
                    let bottomCollider = this.world.getComponentData(bounds.bottom , ut.Physics2D.BoxCollider2D) ,
                        bottomPosition = this.world.getComponentData(bounds.bottom , ut.Core2D.TransformLocalPosition) ,
                        bottomLocalPosition = bottomPosition.position
        
                    bottomLocalPosition = new Vector3(bottomLocalPosition.x , -height - bottomCollider.size.y/2)
                    bottomPosition.position = bottomLocalPosition
                    this.world.setComponentData(bounds.bottom , bottomPosition)
                }

                if(!bounds.right.isNone()) {
                    let rightCollider = this.world.getComponentData(bounds.right , ut.Physics2D.BoxCollider2D) ,
                        rightPosition = this.world.getComponentData(bounds.right , ut.Core2D.TransformLocalPosition) ,
                        rightLocalPosition = rightPosition.position
        
                    rightLocalPosition = new Vector3( rightCollider.size.x/2 + width , rightLocalPosition.y)
                    rightPosition.position = rightLocalPosition
                    this.world.setComponentData(bounds.right , rightPosition)
                }

                if(!bounds.left.isNone()) {
                    let leftCollider = this.world.getComponentData(bounds.left , ut.Physics2D.BoxCollider2D) ,
                        leftPosition = this.world.getComponentData(bounds.left , ut.Core2D.TransformLocalPosition) ,
                        leftLocalPosition = leftPosition.position
        
                    leftLocalPosition = new Vector3( -leftCollider.size.x/2 - width , leftLocalPosition.y)
                    leftPosition.position = leftLocalPosition
                    this.world.setComponentData(bounds.left , leftPosition)
                }
            })
        }
    }
}