class CachedInfoQueue<T> {
    
    private mCachedInfoQueue: Array<CacheInfo<T>>;

    constructor() {
        this.mCachedInfoQueue = new Array<CacheInfo<T>>();
    }

    /**
     * 添加已缓存信息
     * @param cachedInfo 
     */
    public addCachedInfo(cachedInfo: CacheInfo<T>): void {
        this.mCachedInfoQueue.push(cachedInfo);
        console.log('add cached info:', this.mCachedInfoQueue);
    }

    /**
     * 获取已缓存信息
     */
    public shiftCachedInfo(): CacheInfo<T> {
        console.log('shift cached info:', this.mCachedInfoQueue);
        if (this.hasMoreCachedInfo()) {
            return this.mCachedInfoQueue.shift();
        }
        return null;
    }

    /**
     * 是否还有已缓存信息
     */
    public hasMoreCachedInfo(): boolean {
        if (this.getCachedInfoQueueSize() > 0) {
            return true;
        }
        return false;
    }

    public getCachedInfoQueueSize(): number {
        return this.mCachedInfoQueue.length;
    }
    
}

class CacheInfo<T> {
    public task: T;
    public filePath: string;
}