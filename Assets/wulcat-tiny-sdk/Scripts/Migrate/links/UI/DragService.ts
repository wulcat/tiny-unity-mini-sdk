namespace game {
    export class DragService {
        private static currentDrag : ut.Entity = ut.NONE
        static getDrag() : ut.Entity {
            return this.currentDrag
        }
        static setDrag(drag : ut.Entity) {
            this.currentDrag = drag
        }
    }
}