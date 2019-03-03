class RecordPageUI extends ui.test.RecordPageUI {

    private mRecordMgr: RecordMgr;
    private mAudioMgr: WxAudioMgr;
    private mTempRecordFilePath: string;

    constructor() {
        super();
        this.mStartBtn.on(Laya.Event.CLICK, this, this.onStartEvent);
        this.mPauseBtn.on(Laya.Event.CLICK, this, this.onPauseEvent);
        this.mResumeBtn.on(Laya.Event.CLICK, this, this.onResumeEvent);
        this.mStopBtn.on(Laya.Event.CLICK, this, this.onStopEvent);
        this.mPlayRecord.on(Laya.Event.CLICK, this, this.onPlayRecord);
        this.mClose.on(Laya.Event.CLICK, this, this.onCloseBtn);

        this.mRecordMgr = new RecordMgr();
        this.mRecordMgr.setRecorderHandler(Laya.Handler.create(this, this.onRecordError, null, false),
                                        Laya.Handler.create(this, this.onRecordStop, null, false));
        this.mAudioMgr = new WxAudioMgr(null, null);
        this.mTab.selectedIndex = 2;
        this.ajustUi();
    }

    private onStartEvent(): void {
        this.mRecordMgr.start();
    }

    private onPauseEvent(): void {
        this.mRecordMgr.pause();
    }

    private onResumeEvent(): void {
        this.mRecordMgr.resume();
    }

    private onStopEvent(): void {
        this.mRecordMgr.stop();
    }

    private onPlayRecord(): void {
        console.log('on play record file path:', this.mTempRecordFilePath);
        this.mAudioMgr.updateAudioSrc(this.mTempRecordFilePath);
    }

    private onRecordError(): void {

    }

    private onRecordStop(data: any): void {
        console.log('on record stop. temp file:', data);
        this.mTempRecordFilePath = data.tempFilePath;
    }

    private onCloseBtn(): void {
        Laya.stage.removeChild(this);
    }

    private ajustUi(): void {
        let h: number = this.getMobileHeight();
        if (h > 1334) {
            this.mTab.top += 80 * ((h-1334)/(1624-1334));
        }
    }

    private getMobileHeight(): number {
        if (!Laya.Browser.onWeiXin) {
            return 1334;
        }

        let wxInfo = wx.getSystemInfoSync();
        console.log('wx height:', wxInfo.windowHeight, ', widht:', wxInfo.windowWidth);
        let h: number = 750 * wxInfo.windowHeight / wxInfo.windowWidth;
        console.log('h:', h);
        if (h > 1334) {
            return h;
        }

        return 1334;

    }
}