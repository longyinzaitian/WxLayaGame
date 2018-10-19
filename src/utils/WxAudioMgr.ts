class WxAudioMgr {
    private mIsWx: Boolean = Laya.Browser.onWeiXin;
    private mAudioCtx: any;
    private mOnPlayHandler: Laya.Handler;
    private mOnErrorHandler: Laya.Handler;

    constructor(onPlayHandler: Laya.Handler, onErrorHandler: Laya.Handler) {
        this.mOnPlayHandler = onPlayHandler;
        this.mOnErrorHandler = onErrorHandler;
        if (this.mIsWx) {
            this.mAudioCtx = wx.createInnerAudioContext();
            var that = this;
            this.mAudioCtx.onPlay(function(res) {
                that.onPlay(res);
            });
            this.mAudioCtx.onError(function(res) {
                that.onError(res);
            });
        }
    }

    public updateAudioSrc(src: string): void {
        if (this.mIsWx) {
            this.mAudioCtx.src = src;
            this.mAudioCtx.play();
        } else {
            Laya.timer.once(2000, this, this.onPlay);
        }
    }

    public stopAudio(): void {
        if (this.mIsWx) {
            this.mAudioCtx.stop();
        }
    }

    private onPlay(res): void {
        console.log('audio play. res:', res);
        if (this.mOnPlayHandler) {
            this.mOnPlayHandler.run();
        }
    }

    private onError(res): void {
        console.log('play error', res);
        if (this.mOnErrorHandler) {
            this.mOnErrorHandler.run();
        }
    }
}