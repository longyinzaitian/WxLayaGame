class ExpandPage extends ui.test.ExpandPageUI {

    constructor() {
        super();
        this.regScriptByCode();
        this.mClose.on(Laya.Event.CLICK, this, this.onCloseClick);
    }

    private regScriptByCode(): void {
        View.regComponent('script.GameScript', script.GameScript);
        var comp = View.getCompInstance({type:'script.GameScript'});
        console.log('comp:', comp);
        
        (comp as script.GameScript).owner = this.mRegByCodeBox;
        (comp as script.GameScript).speed = 8;
        (comp as script.GameScript).userName = "非官方吹牛皮(扩展脚本 -》代码添加)";
        console.log('ui add script box:', this.mUiAddScriptBox);
    }

    private onCloseClick(): void{
        this.removeSelf();
    }
}