namespace app.Service {
    export class TransformService {
        static setParent(world : ut.World , child : ut.Entity , parent : ut.Entity) {
            let node = world.getComponentData(child , ut.Core2D.TransformNode)
                node.parent = parent
            world.setComponentData(child , node)
        }
        
        static getPointerWorldPosition(world: ut.World, cameraEntity: ut.Entity): Vector3 {
            let displayInfo = world.getConfigData(ut.Core2D.DisplayInfo);
            let displaySize = new Vector2(displayInfo.width, displayInfo.height);
            let inputPosition = ut.Runtime.Input.getInputPosition();
            
            return ut.Core2D.TransformService.windowToWorld(world, cameraEntity, inputPosition, displaySize);
        }

        static getTouchWorldPosition(world: ut.World, cameraEntity: ut.Entity , touchOnScreen:ut.Core2D.Touch): Vector3 {
            let displayInfo = world.getConfigData(ut.Core2D.DisplayInfo);
            let displaySize = new Vector2(displayInfo.width, displayInfo.height);

            let inputPosition = new Vector2(touchOnScreen.x , touchOnScreen.y) 
            return ut.Core2D.TransformService.windowToWorld(world, cameraEntity, inputPosition, displaySize);
        }

        static getUniversalTouchWorldPosition() {
            let world = game.Service.getWorld() ,
                camera = game.Service.getCamera() ,
                displayInfo = world.getConfigData(ut.Core2D.DisplayInfo) , 
                displaySize = new Vector2(displayInfo.width, displayInfo.height)

            if(ut.Core2D.Input.isTouchSupported() && ut.Core2D.Input.touchCount() > 0){
                let touch = ut.Runtime.Input.getTouch(0)
                let touchPosition = new Vector2(touch.x , touch.y)
                return ut.Core2D.TransformService.windowToWorld(world, camera, touchPosition, displaySize);
            }
            else {
                let mousePosition = ut.Runtime.Input.getInputPosition()
                return ut.Core2D.TransformService.windowToWorld(world, camera, mousePosition, displaySize);
            }
        }

        static getScreenToWorldRect(world: ut.World , cameraEntity: ut.Entity) {
            let displayInfo = world.getConfigData(ut.Core2D.DisplayInfo);
            let displaySize = new Vector2(displayInfo.width, displayInfo.height);

            let topRight = ut.Core2D.TransformService.windowToWorld(world, cameraEntity, displaySize, displaySize);
            let bottomLeft = ut.Core2D.TransformService.windowToWorld(world, cameraEntity, new Vector2(0,0) , displaySize);
            let center = ut.Core2D.TransformService.windowToWorld(world, cameraEntity, new Vector2(displaySize.x/2,displaySize.y/2), displaySize);

            let width = Math.abs(bottomLeft.x - topRight.x)
            let height = Math.abs(topRight.y - bottomLeft.y)

            return new app.Geometry.Rect( center.x , center.y , width , height)
        }

        static animateScale3(world : ut.World , entity : ut.Entity , size : Vector3 , time : number , delay : number , motion? : ut.Tweens.TweenFunc , loop? : ut.Core2D.LoopMode) {
            let startSize = world.getComponentData(entity , ut.Core2D.TransformLocalScale)

            let scaleTween = new ut.Tweens.TweenDesc
                scaleTween.cid = ut.Core2D.TransformLocalScale.cid
                scaleTween.offset = 0
                scaleTween.duration = time
                scaleTween.func = motion == 0 ? ut.Tweens.TweenFunc.Linear : motion
                scaleTween.loop = loop == 0 ? ut.Core2D.LoopMode.Once : loop
                scaleTween.destroyWhenDone = true
                scaleTween.t = delay
            
            ut.Tweens.TweenService.addTweenVector3(
                world ,
                entity ,
                startSize.scale ,
                size ,
                scaleTween
            )
        }

        static animatePosition3(world : ut.World , entity : ut.Entity , position : Vector3 , time : number , delay : number , motion : ut.Tweens.TweenFunc , loop : ut.Core2D.LoopMode) {
            let startPosition = world.getComponentData(entity , ut.Core2D.TransformLocalPosition)

            let positionTween = new ut.Tweens.TweenDesc
            positionTween.cid = ut.Core2D.TransformLocalScale.cid
            positionTween.offset = 0
            positionTween.duration = time
            positionTween.func = motion == 0 ? ut.Tweens.TweenFunc.Linear : motion
            positionTween.loop = loop == 0 ? ut.Core2D.LoopMode.Once : loop
            positionTween.destroyWhenDone = true
            positionTween.t = delay
            
            ut.Tweens.TweenService.addTweenVector3(
                world ,
                entity ,
                startPosition.position ,
                position ,
                positionTween
            )
        }

        static animateUIposition2(world : ut.World , entity : ut.Entity , position : Vector2 , time : number , delay : number , motion : ut.Tweens.TweenFunc , loop : ut.Core2D.LoopMode) {
            let startPosition = world.getComponentData(entity , ut.UILayout.RectTransform)

            let positionTween = new ut.Tweens.TweenDesc
            positionTween.cid = ut.UILayout.RectTransform.cid
            positionTween.offset = 0
            positionTween.duration = time
            positionTween.func = motion == 0 ? ut.Tweens.TweenFunc.Linear : motion
            positionTween.loop = loop == 0 ? ut.Core2D.LoopMode.Once : loop
            positionTween.destroyWhenDone = true
            positionTween.t = delay

            ut.Tweens.TweenService.addTweenVector2(
                world ,
                entity ,
                startPosition.anchoredPosition ,
                position ,
                positionTween
            )
        }

        static animateQuaternion(world : ut.World , entity : ut.Entity , angleInRadians : number , time : number , motion? : ut.Tweens.TweenFunc , loop? : ut.Core2D.LoopMode) {
            let startRotation = world.getComponentData(entity , ut.Core2D.TransformLocalRotation)

            let rotateTween = new ut.Tweens.TweenDesc;
            rotateTween.cid = ut.Core2D.TransformLocalRotation.cid;
            rotateTween.offset = 0
            rotateTween.duration = time
            rotateTween.func = motion == 0 ? ut.Tweens.TweenFunc.Linear : motion
            rotateTween.loop = loop == 0 ? ut.Core2D.LoopMode.Once : loop
            rotateTween.destroyWhenDone = true
            rotateTween.t = 0.0
            
            ut.Tweens.TweenService.addTweenQuaternion(
                world,
                entity,
                startRotation.rotation,
                new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angleInRadians) ,
                rotateTween);
        }

    }
}