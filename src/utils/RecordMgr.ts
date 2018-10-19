class RecordMgr {

    private mRecorderMgr: RecorderManager;
    private mDefaultDuration: number = 1;

    private mErrorHandler: Laya.Handler;
    private mStopHandler: Laya.Handler;

    private options: any = {
        duration: 1000 * 60,
        format: 'mp3'
        };

    constructor() {
        if (!Laya.Browser.onWeiXin) {
            return;
        }
        this.mRecorderMgr = Laya.Browser.window.wx.getRecorderManager();
        let that = this;
        this.mRecorderMgr.onStart(() => {
            that.onStart();
        });
        this.mRecorderMgr.onPause(() => {
            that.onPause();
        });
        this.mRecorderMgr.onResume(() => {
            that.onResume();
        });
        this.mRecorderMgr.onStop((res) => {
            that.onStop(res);
        });
        this.mRecorderMgr.onError((res) => {
            that.onError(res);
        });

        let sysInfoObj: any = wx.getSystemInfoSync();
        if (sysInfoObj.SDKVersion >= '2.3.0') {
            this.mRecorderMgr.onInterruptionBegin((res) => {
                that.onInterruptionBegin(res);
            });
            this.mRecorderMgr.onInterruptionEnd((res) => {
                that.onInterruptionEnd(res);
            });
        }
    }

    public setRecorderDuration(duration: number): void {
        this.mDefaultDuration = duration;
        this.options.duration = 1000 * 60 * this.mDefaultDuration;
    }

    public setRecorderHandler(errorHandler: Laya.Handler, stopHandler: Laya.Handler): void {
        this.mErrorHandler = errorHandler;
        this.mStopHandler = stopHandler;
        console.log('error handler:', this.mErrorHandler);
        console.log('stop handler:', this.mStopHandler);
    }

    public start(): void {
        if (this.mRecorderMgr) {
            this.mRecorderMgr.start(this.options);
        }
    }

    public pause(): void {
        if (this.mRecorderMgr) {
            this.mRecorderMgr.pause();
        }
    }

    public resume(): void {
        if (this.mRecorderMgr) {
            this.mRecorderMgr.resume();
        }
    }

    public stop(): void {
        if (this.mRecorderMgr) {
            this.mRecorderMgr.stop();
        }
    }

    private onStart(): void {
        console.log('recorder on start');
    }

    private onPause(): void {
        console.log('recorder on pause');
    }

    private onResume(): void {
        console.log('recorder on resume');
    }

    private onStop(res): void {
        console.log('recorder on stop:', res);
        if (this.mStopHandler) {
            this.mStopHandler.runWith({'tempFilePath': res.tempFilePath});
        }
    }

    private onError(res): void {
        console.log('recorder on error.', res);
        if (this.mErrorHandler) {
            this.mErrorHandler.run();
        }
    }

    private onInterruptionBegin(res): void {
        console.log('recorder on interruption begin.', res);
    }

    private onInterruptionEnd(res): void {
        console.log('recorder on interruption end.', res);
    }

}