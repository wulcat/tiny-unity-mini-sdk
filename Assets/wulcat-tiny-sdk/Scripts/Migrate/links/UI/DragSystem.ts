namespace game {
    export class DragSystem extends ut.ComponentSystem {
        OnUpdate() : void {
            let config = game.Service.getConfig(this.world)
            let record = game.Service.getRecord()
            
            if(record.live <= 0) {
                return
            }

            let drag = game.DragService.getDrag()

            if(drag.isNone()) {
                drag = game.Service.mouseButtonDownOnEntity()
                if(drag.isNone() || !this.world.hasComponent(drag , game.Draggable)) return
                game.DragService.setDrag(new ut.Entity(drag.index , drag.version))
            }

            this.world.usingComponentData(drag , [game.Draggable , ut.Core2D.LayerSorting , ut.Core2D.TransformLocalPosition] , (draggable , layerSorting , position)=>{
                if(ut.Core2D.Input.getMouseButtonDown(0)) {
                    let mouse = ut.Core2D.Input.getInputPosition()
                        draggable.lastTouch = new Vector2(mouse.x , mouse.y)
                        draggable.isDrag = true

                    // Increase the order to make it visible over all images
                    draggable.order = layerSorting.order
                    layerSorting.order = 999
                    // ANIMATION
                    app.Service.TransformService.animateScale3(
                        this.world , 
                        drag ,
                        new Vector3(0.7,0.7,1) ,
                        0.1 ,
                        0 ,
                        ut.Tweens.TweenFunc.Linear ,
                        ut.Core2D.LoopMode.Once
                    )
                }
                else if(ut.Core2D.Input.getMouseButton(0)) {
                    let worldTouch = app.Service.TransformService.getUniversalTouchWorldPosition()
                    
                    if(draggable.isDrag)
                        position.position = new Vector3(worldTouch.x , worldTouch.y , 0)
                }
                else if(ut.Core2D.Input.getMouseButtonUp(0)) {
                    if(draggable.isDrag) {
                        draggable.isDrag = false
                        // Increase the order to make it visible over all images
                        layerSorting.order = draggable.order
                        // ANIMATION
                        app.Service.TransformService.animateScale3(
                            this.world , 
                            drag ,
                            new Vector3(1,1,1) ,
                            0.1 ,
                            0 ,
                            ut.Tweens.TweenFunc.Linear ,
                            ut.Core2D.LoopMode.Once
                        )
                    } 
                    game.DragService.setDrag(ut.NONE)
                    if(this.world.hasComponent(drag , game.ItemTag)) {
                        let item = this.world.getComponentData(drag , game.ItemTag)
                        position.position = item.originalPosition


                    }
                }
            })
        }
    }
}