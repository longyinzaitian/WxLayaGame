import Label = Laya.Label;
import Handler = Laya.Handler;

class TestPageUI  extends ui.test.TestPageUI {
    constructor() {
        super();
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        this.btn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.btn2.on(Laya.Event.CLICK, this, this.onBtn2Click);
        this.closeBtn.on(Laya.Event.CLICK, this,  this.onCloseBtn);
        this.radio.on(Laya.Event.CHANGE, this, this.onRadioGroupChange);
        
        if (Laya.Browser.onWeiXin) {
            wx.showShareMenu();
            wx.onShareAppMessage(function () {
                console.log('on share app msg');
                // 用户点击了“转发”按钮
                return {
                    title: '转发标题',
                    query: "paramA=abc&test=value",
                }
            });
        }
    }

    private onCloseBtn(): void {
        this.removeSelf();
    }

    private onRadioGroupChange(event) : void {
        if (this.radio.selectedIndex == 2) {
            this.removeSelf();
        }
    }

    private onBtnClick(): void {
        //手动控制组件属性
        this.radio.selectedIndex = 1;
        this.clip.index = 8;
        this.tab.selectedIndex = 2;
        this.combobox.selectedIndex = 0;
        this.check.selected = true;

        AudioMgr.playSound();
    }

    private onBtn2Click(): void {
        //通过赋值可以简单快速修改组件属性
        //赋值有两种方式：
        //简单赋值，比如：progress:0.2，就是更改progress组件的value为2
        //复杂复制，可以通知某个属性，比如：label:{color:"#ff0000",text:"Hello LayaAir"}
        this.box.dataSource = { slider: 50, scroll: 80, progress: 0.2, input: "This is a input", label: { color: "#ff0000", text: "Hello LayaAir" } };

        //list赋值，先获得一个数据源数组
        var arr: Array<any> = [];
        for (var i: number = 0; i < 100; i++) {
            arr.push({ label: "item " + i, clip: i % 9 });
        }

        //给list赋值更改list的显示
        this.list.array = arr;

        //还可以自定义list渲染方式，可以打开下面注释看一下效果
        this.list.renderHandler = new Handler(this, this.onListRender);
    }

    private onListRender(item: Laya.Box, index: number): void {
        //自定义list的渲染方式
        var label: Label = item.getChildByName("label") as Label;
        if (index % 2) {
            label.color = "#ff0000";
        } else {
            label.color = "#000000";
        }
    }
}