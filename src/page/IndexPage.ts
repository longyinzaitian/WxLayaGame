class IndexPage extends ui.test.IndexPageUI {
    constructor() {
        super();

        this.mTestBtn.on(Laya.Event.CLICK, this, function() {
            if (!GameMain.testUI) {
                GameMain.testUI = new TestPageUI();
            }
            Laya.stage.addChild(GameMain.testUI);
        });

        this.mBonesBtn.on(Laya.Event.CLICK, this, function() {
            if (!GameMain.bonesPage) {
                GameMain.bonesPage = new BonesPageUI();
            }

            Laya.stage.addChild(GameMain.bonesPage);
        });

        this.mRecordBtn.on(Laya.Event.CLICK, this, function() {
            if (!GameMain.recordPage) {
                GameMain.recordPage = new RecordPageUI();
            }
            Laya.stage.addChild(GameMain.recordPage);
        });

        this.mRoundCirclePage.on(Laya.Event.CLICK, this, function() {
            if (!GameMain.roundCirclePage) {
                GameMain.roundCirclePage = new RoundCirclePage();
            }
            Laya.stage.addChild(GameMain.roundCirclePage);
        });

        this.mExpandBtn.on(Laya.Event.CLICK, this, function() {
            if (!GameMain.expandPage) {
                GameMain.expandPage = new ExpandPage();
            }
            Laya.stage.addChild(GameMain.expandPage);
        });
    }

}