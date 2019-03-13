// namespace game {
//     export class DragUIFilter extends ut.EntityFilter {
//         entity : ut.Entity
//         draggable : game.Draggable
//         rectTransform : ut.UILayout.RectTransform
//         interaction : ut.UIControls.MouseInteraction
//         layerSorting : ut.Core2D.LayerSorting
//     }
//     export class DragUIBehaviour extends ut.ComponentBehaviour {
//         data : DragUIFilter
//         OnEntityUpdate() :void {
    // if(game.Service.isPaused) return
//             if(!this.data.draggable.canDrag) return

//             if(ut.Core2D.Input.isTouchSupported() && ut.Core2D.Input.touchCount() > 0) {
//                 let touch = ut.Core2D.Input.getTouch(0) , 
//                     touchPos = new Vector2(touch.x , touch.y)
//                 switch(touch.phase) {
//                     case ut.Core2D.TouchState.Began :
//                         if(this.data.interaction.over) {
//                             let mouse = ut.Core2D.Input.getInputPosition()
//                                 this.data.draggable.lastTouch = new Vector2(mouse.x , mouse.y)
//                                 this.data.draggable.isDrag = true

//                             // Increase the order to make it visible over all images
//                             this.data.draggable.order = this.data.layerSorting.order
//                             this.data.layerSorting.order = 999

//                             // ANIMATION
//                             app.Service.TransformService.animateScale3(
//                                 this.world , 
//                                 this.data.entity ,
//                                 new Vector3(0.7,0.7,1) ,
//                                 0.1 ,
//                                 0 ,
//                                 ut.Tweens.TweenFunc.Linear ,
//                                 ut.Core2D.LoopMode.Once
//                             )
//                         }
//                         break ;
//                     case ut.Core2D.TouchState.Moved :
//                         if(this.data.draggable.isDrag) {
//                             let lastTouch = this.data.draggable.lastTouch ,
//                                 // FIXME: multiplied a scalar 1.2 value . The screen point is different than the canvas world size
//                                 updatePos = new Vector2().subVectors(touchPos , lastTouch).multiplyScalar(0.81)

//                             this.data.rectTransform.anchoredPosition.add(updatePos)
//                             this.data.draggable.lastTouch = touchPos
//                         }
//                         break
//                     case ut.Core2D.TouchState.Ended :
//                         if(this.data.draggable.isDrag) {
//                             this.data.draggable.isDrag = false
//                             // Increase the order to make it visible over all images
//                             this.data.layerSorting.order = this.data.draggable.order

//                             // ANIMATION
//                             app.Service.TransformService.animateScale3(
//                                 this.world , 
//                                 this.data.entity ,
//                                 new Vector3(1,1,1) ,
//                                 0.1 ,
//                                 0 ,
//                                 ut.Tweens.TweenFunc.Linear ,
//                                 ut.Core2D.LoopMode.Once
//                             )
//                         }
//                     default :
//                         break
//                 }
//             }
//             else {
//                 if(ut.Core2D.Input.getMouseButtonDown(0)) {
//                     if(this.data.interaction.over) {
//                         let mouse = ut.Core2D.Input.getInputPosition()
//                             this.data.draggable.lastTouch = new Vector2(mouse.x , mouse.y)
//                             this.data.draggable.isDrag = true

//                         // Increase the order to make it visible over all images
//                         this.data.draggable.order = this.data.layerSorting.order
//                         this.data.layerSorting.order = 999
//                         // ANIMATION
//                         app.Service.TransformService.animateScale3(
//                             this.world , 
//                             this.data.entity ,
//                             new Vector3(0.7,0.7,1) ,
//                             0.1 ,
//                             0 ,
//                             ut.Tweens.TweenFunc.Linear ,
//                             ut.Core2D.LoopMode.Once
//                         )
//                     }
//                 }
//                 else if(ut.Core2D.Input.getMouseButton(0)) {
//                     if(this.data.draggable.isDrag) {
//                         let mouseTouch = ut.Core2D.Input.getInputPosition() ,
//                             lastTouch = this.data.draggable.lastTouch ,
//                             // FIXME: multiplied a scalar 1.2 value . The screen point is different than the canvas world size
//                             updatePos = new Vector2().subVectors(mouseTouch , lastTouch).multiplyScalar(0.81)
//                         this.data.rectTransform.anchoredPosition.add(updatePos)
//                         this.data.draggable.lastTouch = mouseTouch
//                     }
//                 }
//                 else if(ut.Core2D.Input.getMouseButtonUp(0)) {
//                     if(this.data.draggable.isDrag) {
//                         this.data.draggable.isDrag = false
//                         // Increase the order to make it visible over all images
//                         this.data.layerSorting.order = this.data.draggable.order
//                         // ANIMATION
//                         app.Service.TransformService.animateScale3(
//                             this.world , 
//                             this.data.entity ,
//                             new Vector3(1,1,1) ,
//                             0.1 ,
//                             0 ,
//                             ut.Tweens.TweenFunc.Linear ,
//                             ut.Core2D.LoopMode.Once
//                         )
//                     }
//                 }
//             }
//         }
        
//     }
// }