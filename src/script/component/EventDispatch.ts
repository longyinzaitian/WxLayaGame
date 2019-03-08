export default class EventDispatch {
    private static stDispatch: Laya.EventDispatcher;

    private static getInstance(): Laya.EventDispatcher {
        if (!this.stDispatch) {
            this.stDispatch = new Laya.EventDispatcher();
        }
        return this.stDispatch;
    }

    public static event(enName, arg = null) {
        // 产生事件
        this.getInstance().event(enName, arg);
    }

    public static register(enName, caller, listener, arg = null) {
        // 注册事件处理函数
        this.getInstance().on(enName, caller, listener, (arg == null) ? null : ([arg]));
    }

    public static unregister(enName, caller, listener): void {
        this.getInstance().off(enName, caller, listener);
    }
}