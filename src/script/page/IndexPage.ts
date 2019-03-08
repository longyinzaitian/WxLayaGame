import TestPageUI from "./TestPageUI";
import BonesPageUI from "./BonesPageUI";
import Main from "../../Main";
import RecordPageUI from "./RecordPage";
import RoundCirclePage from "./RoundCirclePage";
import { ui } from "../../ui/layaMaxUI";
import ExpandPageScene from "./ExpandPageScene";

export default class IndexPage extends ui.test.IndexPageSceneUI {
    constructor() {
        super();
    }

    onEnable() {
        this.mTestBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open('test/TestPageScene.scene', false);
        });

        this.mBonesBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open('test/BonesViewScene.scene', false);
        });

        this.mRecordBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open('test/RecordpageScene.scene', false);
        });

        this.mRoundCirclePage.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open('test/RoundCircleProBarPageScene.scene', false);
        });

        this.mExpandBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open('test/ExpandPageScene.scene', false);
        });
    }

}