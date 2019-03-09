import { ui } from "../../ui/layaMaxUI";
import { INDEX_SCENE } from "../utils/Consts";

export default class ViewPagerScene extends ui.test.ViewPageSceneUI {
    constructor() {
        super();
    }

    onEnable() {
        console.log('ViewPagerScene . on eable.');

        this.mCloseBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.close(INDEX_SCENE.VIEW_PAGER_PAGE);
        });

        this.mBtnFirst.on(Laya.Event.CLICK, this, () => {

        });

        this.mBtnSecond.on(Laya.Event.CLICK, this, () => {
        
        });

        this.mContainer.on(Laya.Event.MOUSE_DOWN, this, (event) => {
            console.log('start. event:', event);
        });

        this.mContainer.on(Laya.Event.MOUSE_MOVE, this, (event) => {
            console.log('move. event: ', event);
        });

        this.mContainer.on(Laya.Event.MOUSE_UP, this, (event) => {
            console.log('end. event:', event);
        });
    }
}