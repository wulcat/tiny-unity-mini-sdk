namespace app {
    export class UIService {
        private static CanvasCameraEntity : ut.Entity

        static anchorCenter(world : ut.World , entity : ut.Entity , position? : Vector2 , size? : Vector2) : ut.Entity {
            let rectTransform = world.getComponentData(entity , ut.UILayout.RectTransform)

            rectTransform.anchorMin = new Vector2(0.5,0.5)
            rectTransform.anchorMax = new Vector2(0.5,0.5)
            rectTransform.anchoredPosition = position || new Vector2(0,0)
            rectTransform.sizeDelta = size || new Vector2(200 , 200)

            world.setComponentData(entity , rectTransform)
            return entity
        }

        static instantiateUI(world : ut.World , entityName : string) : ut.Entity {
            // create ui
            let clone = ut.EntityGroup.instantiate(world , entityName)[0]
            // assign camera to ui
            let canvas = world.getComponentData(clone , ut.UILayout.UICanvas)
            
            // try to get the reference
            if(!world.exists(this.CanvasCameraEntity)) {
                this.CanvasCameraEntity = world.getEntityByName("CanvasCamera")
                if(!world.exists(this.CanvasCameraEntity)) {
                    this.CanvasCameraEntity = null
                    return null
                }
            }
            canvas.camera = this.CanvasCameraEntity
            world.setComponentData(clone , canvas)
        }

        static instantiateUIButton(world : ut.World , entityName : string , events : app.UI.Events) : ut.Entity {
            // create ui
            let clone = ut.EntityGroup.instantiate(world , entityName)[0]
            // add Callbacks
            if(events.onClick)
                ut.UIControls.UIControlsService.addOnClickCallback(world , clone , events.onClick)
            if(events.onDown)
                ut.UIControls.UIControlsService.addOnDownCallback(world , clone , events.onDown)
            if(events.onEnter)
                ut.UIControls.UIControlsService.addOnEnterCallback(world , clone , events.onEnter)
            if(events.onLeave)
                ut.UIControls.UIControlsService.addOnLeaveCallback(world , clone , events.onLeave)
            if(events.onUp)
                ut.UIControls.UIControlsService.addOnUpCallback(world , clone , events.onUp)
                
            // assign camera to ui
            let canvas = world.getComponentData(clone , ut.UILayout.UICanvas)
            
            // try to get the reference
            if(!world.exists(this.CanvasCameraEntity)) {
                this.CanvasCameraEntity = world.getEntityByName("CanvasCamera")
                if(!world.exists(this.CanvasCameraEntity)) {
                    this.CanvasCameraEntity = null
                    return null
                }
            }
            canvas.camera = this.CanvasCameraEntity
            world.setComponentData(clone , canvas)
        }
    }
}

namespace app.UI {
    export class Events {
        onClick : ut.UIControls.UIControlEventFn
        onDown : ut.UIControls.UIControlEventFn
        onEnter : ut.UIControls.UIControlEventFn
        onLeave : ut.UIControls.UIControlEventFn
        onUp : ut.UIControls.UIControlEventFn

        constructor(onClick , onDown , onEnter , onLeave , onUp){
            this.onClick = onClick
            this.onDown = onDown
            this.onEnter = onEnter
            this.onLeave = onLeave
            this.onUp = onUp
        }
    }
}