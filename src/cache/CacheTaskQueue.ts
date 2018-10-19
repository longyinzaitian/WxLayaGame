class CacheTaskQueue<T> {
    private mTaskQueue: Array<T>;
    constructor() {
        this.mTaskQueue = new Array<T>();
    }

    /**
     * 添加任务
     * @param task 
     */
    public addCacheTask(task: T): void {
        this.mTaskQueue.push(task);
    }

    /**
     * 批量添加任务
     * @param tasks 
     */
    public addCacheTasks(tasks: Array<T>): void {
        this.mTaskQueue = this.mTaskQueue.concat(tasks);
        console.log('add cache tasks:', this.mTaskQueue);
    }

    /**
     * 取出任务
     */
    public shiftCacheTask(): T {
        console.log('shift cache tasks:', this.mTaskQueue);
        if (this.hasMoreTask()) {
            return this.mTaskQueue.shift();
        }
        return null;
    }

    /**
     * 是否还有任务
     */
    public hasMoreTask(): boolean {
        if (this.getCacheTaskQueueSize() > 0) {
            return true;
        }
        return false;
    }

    public getCacheTaskQueueSize(): number {
        return this.mTaskQueue.length;
    }
}