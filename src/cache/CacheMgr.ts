class CacheMgr<T> {
    private static DEFAULT_CACHE_NUM: number = 10;
    private mCacheTaskQueue: CacheTaskQueue<T>;
    private mCachedInfoQueue: CachedInfoQueue<T>;
    /**
     * 注册缓存监听：
     * 目地：当播放时无法获取到对应的缓存时，通过该监听通知上层，缓存完成
     */
    private mCachedHandler: Laya.Handler;
    //所有缓存任务队列
    private mAllCacheTasks: Array<T>;
    //创建文件夹失败回调
    private mMkDirFailHandler: Laya.Handler;
    private mDownloadFileUtil: DownloadFileUtil;

    //当前缓存的下载文件索引,用于生成文件名字
    private mDownloadFileIndex: number = 0;
    //当前缓存的名字
    private mDownloadFileName: string;
    //当前缓存地址
    private mDonwloadUrl: T;
    //是否自动缓存更多。默认缓存十个。
    private mIsCacheMore: boolean = false;

    constructor(isCacheMore: boolean, dirPath: string, mkDirFailHandler: Laya.Handler) {
        this.mCachedInfoQueue = new CachedInfoQueue<T>();
        this.mCacheTaskQueue = new CacheTaskQueue<T>();
        this.mDownloadFileUtil = new DownloadFileUtil(dirPath);
        this.mIsCacheMore = isCacheMore;
    }

    /**
     * 添加全部缓存任务
     * @param tasks 
     */
    public addAllCacheTask(tasks: Array<T>): void {
        this.mAllCacheTasks = tasks;
        var tempTasks;
        if (this.mAllCacheTasks.length <= CacheMgr.DEFAULT_CACHE_NUM) {
            tempTasks = this.mAllCacheTasks;
        } else {
            tempTasks = this.mAllCacheTasks.splice(0, CacheMgr.DEFAULT_CACHE_NUM);
        }
        this.mCacheTaskQueue.addCacheTasks(tempTasks);
        this.checkDirAccess();
    }

    /**
     * 获取已缓存信息
     */
    public getCachedInfo(): CacheInfo<T> {
        return this.mCachedInfoQueue.shiftCachedInfo();
    }

    /**
     * 注册缓存监听
     * @param cachedHandler
     */
    public registerCachedHandler(cachedHandler: Laya.Handler): void {
        this.mCachedHandler = cachedHandler;
    }

    public stopAudioToRemoveFile(filePath: string): void {
        this.mDownloadFileUtil.removeSavedFile(filePath, Laya.Handler.create(this, this.removeFileSuc),
                                        Laya.Handler.create(this, this.removeFileFail));
    }

    private removeFileSuc(): void {
        this.startDownloadFile();
    }

    private removeFileFail(): void {
        this.startDownloadFile();
    }

//==============================================================================
    private checkDirAccess(): void {
        this.mDownloadFileUtil.checkDir(Laya.Handler.create(this, this.checkDirSuc),
                                Laya.Handler.create(this, this.checkDirFail));
    }

    private checkDirSuc(): void {
        this.startDownloadFile();
    }

    private checkDirFail(): void {
        this.mDownloadFileUtil.mkDir(Laya.Handler.create(this, this.mkDirSuc),
                                    Laya.Handler.create(this, this.mkDirFail));
    }

    private mkDirSuc(): void {
        this.startDownloadFile();
    }

    private mkDirFail(): void {
        if(this.mMkDirFailHandler) {
            this.mMkDirFailHandler.run();
        }
    }

    private downloadFileSuc(): void {
        let cacheInfo:CacheInfo<T> = new CacheInfo<T>();
        cacheInfo.filePath = this.mDownloadFileName;
        cacheInfo.task = this.mDonwloadUrl;
        this.mCachedInfoQueue.addCachedInfo(cacheInfo);
        this.startDownloadFile();
    }

    private downloadFileFail(): void {
        this.startDownloadFile();
    }

    private startDownloadFile(): void {
        if (this.mDownloadFileIndex >= CacheMgr.DEFAULT_CACHE_NUM) {
            this.mDownloadFileIndex = 0;
        }
        let url: T = this.mCacheTaskQueue.shiftCacheTask();
        this.mDonwloadUrl = url;
        if (url == null) {
            let toLoadSize = this.checkToLoadTask();
            console.log('down load file queue is empty. to load size:', toLoadSize, ', all tasks len:', this.mAllCacheTasks.length);
            if (toLoadSize <= 0 || this.mAllCacheTasks.length <= 0) {
                return;
            }

            if (this.mAllCacheTasks.length >= toLoadSize) {
                this.mCacheTaskQueue.addCacheTasks(this.mAllCacheTasks.splice(0, toLoadSize));
            } else {
                this.mCacheTaskQueue.addCacheTasks(this.mAllCacheTasks.splice(0, this.mAllCacheTasks.length));
            }
            url = this.mCacheTaskQueue.shiftCacheTask();
            this.mDonwloadUrl = url;
        }
        this.mDownloadFileName = 'music'+this.mDownloadFileIndex+'.mp3';
        console.log('down load url:', url, ', down load file name:', this.mDownloadFileName);
        this.mDownloadFileUtil.downloadFile(url+'', this.mDownloadFileName, Laya.Handler.create(this, this.downloadFileSuc),
                                    Laya.Handler.create(this, this.downloadFileFail));
        this.mDownloadFileIndex++;
    }

    /**
     * 检查需要缓存的个数
     */
    private checkToLoadTask(): number {
        let cacheTaskSize = this.mCacheTaskQueue.getCacheTaskQueueSize();
        let cachedInfoSize = this.mCachedInfoQueue.getCachedInfoQueueSize();
        let cachingSize = cacheTaskSize + cachedInfoSize;
        if (cachingSize >= CacheMgr.DEFAULT_CACHE_NUM || !this.mIsCacheMore) {
            return 0;
        } else {
            return CacheMgr.DEFAULT_CACHE_NUM - cachingSize;
        }
    }
}