import { ui } from "../../ui/layaMaxUI";
import GameScript from "../GameScript";
import { INDEX_SCENE } from "../utils/Consts";

export default class ExpandPageScene extends ui.test.ExpandPageSceneUI {
    constructor() {
        super();
    }

    onEnable() {
        this.init();
    }

    private init(): void {
        this.regScriptByCode();
        this.mClose.on(Laya.Event.CLICK, this, this.onCloseClick);
    }

    private regScriptByCode(): void {
        this.mBox.addComponent(GameScript);
        this.mBox.getComponent(GameScript).owner = this.mBox;
        this.mBox.getComponent(GameScript).speed = 9;
        this.mBox.getComponent(GameScript).userName = "非官方吹牛皮(扩展脚本 -》代码添加)";
        this.mBox.getComponent(GameScript).startAnim();
        
    }

    private onCloseClick(): void{
        Laya.Scene.close(INDEX_SCENE.EXPEND_PAGE);
    }
}