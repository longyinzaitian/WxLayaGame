import Label = Laya.Label;
import Handler = Laya.Handler;
import { ui } from "../../ui/layaMaxUI";
import AudioMgr from "../utils/AudioMgr";
import { INDEX_SCENE } from "../utils/Consts";

export default class TestPageUI  extends ui.test.TestPageSceneUI {
    constructor() {
        super();
    }

    onEnable() {
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        this.btn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.btn2.on(Laya.Event.CLICK, this, this.onBtn2Click);
        this.closeBtn.on(Laya.Event.CLICK, this,  this.onCloseBtn);
        this.radio.on(Laya.Event.CHANGE, this, this.onRadioGroupChange);
        
        if (Laya.Browser.onWeiXin) {
            wx.showShareMenu();
            wx.onShareAppMessage(() => {
                console.log('on share app msg');
                // 用户点击了“转发”按钮
                return {
                    title: '转发标题',
                    query: "paramA=abc&test=value",
                }
            });
        }

        this.setBitmapFont();
    }

    private onCloseBtn(): void {
        Laya.Scene.close(INDEX_SCENE.TEST_PAGE);
    }

    private onRadioGroupChange(event) : void {
        if (this.radio.selectedIndex == 2) {
            this.onCloseBtn();
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
        this.playAnim();
    }

    private anim: Laya.Animation;
    private playAnim():void {
        if (!this.anim) {
            let ani: Laya.Animation = new Laya.Animation();
            ani.loadAnimation("test/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, this.animComplete);
            ani.pos(200, 300);
            this.stage.addChild(ani);
            this.anim = ani;
        }
        this.anim.play(0, false);
    }

    private animComplete(res): void {
        console.log('anim complete.', res);
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
        this.list.renderHandler = Laya.Handler.create(this, this.onListRender);
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

    // 使用位图字体
    private mFontName:string = "diyFont";
    private bitmapFont: Laya.BitmapFont;
    private setBitmapFont(): void {
        this.bitmapFont = new Laya.BitmapFont();
        this.bitmapFont.loadFont("res/font_add/font_num.fnt",new Laya.Handler(this,this.onLoaded));
        
    }

    private onLoaded(): void {
        this.bitmapFont.autoScaleSize = true;
        Laya.Text.registerBitmapFont(this.mFontName, this.bitmapFont);
        var txt = this.mText;
        txt.text = "09876652134";
        //设置宽度，高度自动匹配
        txt.width = 750;
        //自动换行
        txt.wordWrap = true;
        txt.align = "left";
        //使用我们注册的字体
        txt.font = this.mFontName;
        txt.fontSize = 10;
        txt.leading = 5;

        this.mLabel.font = this.mFontName;
        this.mLabel.fontSize = 24;
    }
}