import TestPageUI from "./TestPageUI";
import BonesPageUI from "./BonesPageUI";
import Main from "../../Main";
import RecordPageUI from "./RecordPage";
import RoundCirclePage from "./RoundCirclePage";
import { ui } from "../../ui/layaMaxUI";
import ExpandPageScene from "./ExpandPageScene";
import { INDEX_SCENE } from "../utils/Consts";

export default class IndexPage extends ui.test.IndexPageSceneUI {
    constructor() {
        super();
    }

    onEnable() {
        this.mTestBtn.on(Laya.Event.CLICK, this, () => {
            this.openScence(INDEX_SCENE.TEST_PAGE);
        });

        this.mBonesBtn.on(Laya.Event.CLICK, this, () => {
            this.openScence(INDEX_SCENE.BONES_PAGE);
        });

        this.mRecordBtn.on(Laya.Event.CLICK, this, () => {
            this.openScence(INDEX_SCENE.RECORD_PAGE);
        });

        this.mRoundCirclePage.on(Laya.Event.CLICK, this, () => {
            this.openScence(INDEX_SCENE.ROUND_CIRCLE_PAGE);
        });

        this.mExpandBtn.on(Laya.Event.CLICK, this, () => {
            this.openScence(INDEX_SCENE.EXPEND_PAGE);
        });
    }

    private openScence(sceneName: string): void {
        Laya.Scene.open(sceneName, false);
    }

}