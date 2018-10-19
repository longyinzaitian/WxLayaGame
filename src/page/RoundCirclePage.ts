class RoundCirclePage extends ui.test.RoundCircleProBarPageUI {
    constructor() {
        super();
        this.mCloseBtn.on(Laya.Event.CLICK, this, this.onClose);
        this.startCirclePro();
    }

    private startCirclePro(): void {
        // this.mCircleSprite.graphics.drawPie(48, 48, 60, 0, 1, '#ff0000', null, 10);
        //这个地方有个坑  直接从0-360画不成，必须先0-350然后在从350-360画才成。
        this.mCircleSprite.graphics.drawPie(48, 48, 60, 0, 359, '#ff0000', null, 10);
    }

    private onClose(): void {
        Laya.stage.removeChild(this);
    }
}