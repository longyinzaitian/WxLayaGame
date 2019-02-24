
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class BonesViewUI extends View {
		public mCloseBtn:Laya.Button;
		public mLoop:Laya.Label;
		public mAnimLabel:Laya.Label;
		public mSleep:Laya.Label;
		public mStand:Laya.Label;
		public mWalk:Laya.Label;
		public mEat:Laya.Label;
		public mRun:Laya.Label;
		public mChangeSkin:Laya.Label;
		public mchangeHair:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"layoutEnabled":true,"height":1334},"child":[{"type":"Image","props":{"top":0,"right":0,"left":0,"layoutEnabled":true,"bottom":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":752,"lineWidth":1,"height":1624,"fillColor":"#cccccc"}}]},{"type":"Button","props":{"x":0,"width":120,"var":"mCloseBtn","top":0,"stateNum":3,"skin":"comp/btn_close.png","left":0,"layoutEnabled":true,"height":88}},{"type":"Box","props":{"width":750,"layoutEnabled":true,"height":201,"centerX":0,"bottom":0},"child":[{"type":"Label","props":{"y":1,"x":45,"var":"mLoop","text":"循环：No","fontSize":35,"color":"#0c93ee"}},{"type":"Label","props":{"width":600,"var":"mAnimLabel","text":"动画名称索引:","height":54,"fontSize":35,"color":"#023b24","centerY":-2,"centerX":-30,"align":"left"}},{"type":"Box","props":{"width":658,"height":100,"centerX":0,"bottom":0},"child":[{"type":"Label","props":{"var":"mSleep","text":"睡觉","fontSize":40,"color":"#2f00ee","centerY":0,"align":"center"}},{"type":"Label","props":{"x":141,"var":"mStand","text":"站着","fontSize":40,"color":"#2f00ee","centerY":0}},{"type":"Label","props":{"x":290,"var":"mWalk","text":"走路","fontSize":40,"color":"#2f00ee","centerY":0}},{"type":"Label","props":{"y":-537,"x":422,"var":"mEat","text":"吃吃","fontSize":40,"color":"#2f00ee","centerY":0}},{"type":"Label","props":{"x":533,"var":"mRun","text":"跑路","fontSize":40,"color":"#2f00ee","centerY":0}},{"type":"Label","props":{"y":-205,"x":485,"var":"mChangeSkin","text":"换肤(身体)","fontSize":40,"color":"#0e2892","bgColor":"#60aa7a"}},{"type":"Label","props":{"y":-136,"x":489,"var":"mchangeHair","text":"换肤(头发)","fontSize":40,"color":"#0e2892","bgColor":"#60aa7a"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.BonesViewUI.uiView);

        }

    }
}

module ui.test {
    export class ExpandPageUI extends View {
		public mUiAddScriptBox:Laya.Box;
		public mRegByCodeBox:Laya.Box;
		public mClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"top":0,"skin":"second/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"var":"mUiAddScriptBox","centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":-72,"text":"9999999","name":"userN","fontSize":35,"color":"#d41815","centerX":0}},{"type":"Image","props":{"skin":"comp/image.png","centerX":0}},{"type":"Script","props":{"y":-542,"x":-268,"userName":"非官方吹牛皮(扩展脚本 -》UI添加)","speed":9,"runtime":"script.GameScript"}}]},{"type":"Box","props":{"var":"mRegByCodeBox","centerY":407,"centerX":0},"child":[{"type":"Label","props":{"y":-72,"text":"9999999","name":"userN","fontSize":35,"color":"#d41815","centerX":0}},{"type":"Image","props":{"skin":"comp/image.png","centerX":0}}]},{"type":"Button","props":{"width":120,"var":"mClose","top":0,"stateNum":3,"skin":"comp/btn_close.png","left":0,"height":88}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("script.GameScript",script.GameScript);

            super.createChildren();
            this.createView(ui.test.ExpandPageUI.uiView);

        }

    }
}

module ui.test {
    export class HumanViewUI extends View {
		public img:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":30,"height":30},"child":[{"type":"Image","props":{"y":0,"x":0,"width":30,"var":"img","height":30}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.HumanViewUI.uiView);

        }

    }
}

module ui.test {
    export class IndexPageUI extends View {
		public mBonesBtn:Laya.Label;
		public mTestBtn:Laya.Label;
		public mRecordBtn:Laya.Label;
		public mRoundCirclePage:Laya.Label;
		public mExpandBtn:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"width":750,"layoutEnabled":true,"height":1334},"child":[{"type":"Box","props":{"width":750,"top":400,"layoutEnabled":true,"height":500,"centerX":0},"child":[{"type":"Box","props":{"top":0,"right":0,"left":0,"layoutEnabled":true,"bottom":0},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":500,"fillColor":"#3F51B5"}}]},{"type":"Label","props":{"var":"mBonesBtn","top":40,"text":"龙骨页面","layoutEnabled":true,"fontSize":50,"color":"#000000","centerX":0}},{"type":"Label","props":{"var":"mTestBtn","top":120,"text":"测试页面","layoutEnabled":true,"fontSize":50,"color":"#000000","centerX":0}},{"type":"Label","props":{"var":"mRecordBtn","top":200,"text":"录音界面","layoutEnabled":true,"fontSize":50,"color":"#000000","centerX":0}},{"type":"Label","props":{"var":"mRoundCirclePage","top":280,"text":"圆形进度条界面","layoutEnabled":true,"fontSize":50,"color":"#000000","centerX":0}},{"type":"Label","props":{"var":"mExpandBtn","top":360,"text":"扩展脚本使用","layoutEnabled":true,"fontSize":50,"color":"#000000","centerX":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.IndexPageUI.uiView);

        }

    }
}

module ui.test {
    export class RecordPageUI extends View {
		public mStartBtn:Laya.Label;
		public mPauseBtn:Laya.Label;
		public mResumeBtn:Laya.Label;
		public mStopBtn:Laya.Label;
		public mInputDuration:Laya.TextInput;
		public mPlayRecord:Laya.Label;
		public mClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"top":0,"skin":"second/bg.jpg","right":0,"left":0,"layoutEnabled":true,"bottom":0}},{"type":"Box","props":{"y":193,"x":285,"layoutEnabled":true,"centerX":0},"child":[{"type":"Label","props":{"y":0,"var":"mStartBtn","text":"录音开始","layoutEnabled":true,"fontSize":45,"centerX":0,"bgColor":"#67c18f"}},{"type":"Label","props":{"y":83,"var":"mPauseBtn","text":"录音暂停","layoutEnabled":true,"fontSize":45,"centerX":0,"bgColor":"#67c18f"}},{"type":"Label","props":{"y":163,"var":"mResumeBtn","text":"录音继续","layoutEnabled":true,"fontSize":45,"centerX":0,"bgColor":"#67c18f"}},{"type":"Label","props":{"y":237,"var":"mStopBtn","text":"录音停止","layoutEnabled":true,"fontSize":45,"centerX":0,"bgColor":"#67c18f"}},{"type":"TextInput","props":{"y":333,"width":268,"var":"mInputDuration","text":"默认一分钟","skin":"comp/textinput.png","layoutEnabled":true,"height":45,"fontSize":35,"centerX":0}}]},{"type":"Label","props":{"y":687,"x":252,"var":"mPlayRecord","text":"播放录音","fontSize":45,"bgColor":"#ee8e8d"}},{"type":"Button","props":{"width":120,"var":"mClose","top":0,"stateNum":3,"skin":"comp/btn_close.png","left":0,"height":88}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.RecordPageUI.uiView);

        }

    }
}

module ui.test {
    export class RoundCircleProBarPageUI extends View {
		public mCloseBtn:Laya.Button;
		public mCircleSprite:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"top":0,"skin":"second/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Button","props":{"y":0,"x":0,"width":120,"var":"mCloseBtn","top":0,"stateNum":3,"skin":"comp/btn_close.png","left":0,"height":88}},{"type":"Box","props":{"width":95,"height":95,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":95,"skin":"roundpro/bg_sheep_avatar.png","height":95,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":48,"x":48,"width":95,"skin":"roundpro/img_circle_2.png","pivotY":48,"pivotX":48,"height":95,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":48,"x":48,"width":95,"var":"mCircleSprite","renderType":"mask","pivotY":48,"pivotX":48,"height":95},"child":[{"type":"Pie","props":{"startAngle":0,"renderType":"hit","radius":100,"lineWidth":1,"fillColor":"#ff0000","endAngle":0}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.RoundCircleProBarPageUI.uiView);

        }

    }
}

module ui.test {
    export class TestPageUI extends View {
		public btn:Laya.Button;
		public clip:Laya.Clip;
		public combobox:Laya.ComboBox;
		public tab:Laya.Tab;
		public list:Laya.List;
		public closeBtn:Laya.Button;
		public btn2:Laya.Button;
		public check:Laya.CheckBox;
		public radio:Laya.RadioGroup;
		public box:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"layoutEnabled":true,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":1624,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"width":600,"height":400,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","right":0,"left":0,"layoutEnabled":true,"bottom":0}},{"type":"Button","props":{"y":56,"x":41,"width":150,"var":"btn","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"点我赋值","height":37}},{"type":"Clip","props":{"y":56,"x":401,"var":"clip","skin":"comp/clip_num.png","clipX":10}},{"type":"ComboBox","props":{"y":143,"x":220,"width":200,"var":"combobox","skin":"comp/combobox.png","sizeGrid":"4,20,4,4","selectedIndex":1,"labels":"select1,select2,selecte3","height":23}},{"type":"Tab","props":{"y":96,"x":220,"var":"tab","skin":"comp/tab.png","labels":"tab1,tab2,tab3"}},{"type":"VScrollBar","props":{"y":223,"x":259,"skin":"comp/vscroll.png","height":150}},{"type":"VSlider","props":{"y":223,"x":224,"skin":"comp/vslider.png","height":150}},{"type":"List","props":{"y":68,"x":452,"width":128,"var":"list","vScrollBarSkin":"comp/vscroll.png","repeatX":1,"height":299},"child":[{"type":"Box","props":{"y":0,"x":0,"width":112,"name":"render","height":30},"child":[{"type":"Label","props":{"y":5,"x":26,"width":78,"text":"this is a list","skin":"comp/label.png","name":"label","height":20,"fontSize":14}},{"type":"Clip","props":{"y":2,"x":0,"skin":"comp/clip_num.png","name":"clip","clipX":10}}]}]},{"type":"Button","props":{"y":4,"x":563,"var":"closeBtn","stateNum":3,"skin":"comp/btn_close.png","name":"close"}},{"type":"Button","props":{"y":112,"x":41,"width":150,"var":"btn2","skin":"comp/button.png","sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"label":"点我赋值","height":66}},{"type":"CheckBox","props":{"y":188,"x":220,"var":"check","skin":"comp/checkbox.png","label":"checkBox1"}},{"type":"RadioGroup","props":{"y":61,"x":220,"var":"radio","skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3"}},{"type":"Panel","props":{"y":223,"x":299,"width":127,"vScrollBarSkin":"comp/vscroll.png","height":150},"child":[{"type":"Image","props":{"skin":"comp/image.png"}}]},{"type":"CheckBox","props":{"y":188,"x":326,"skin":"comp/checkbox.png","labelColors":"#ff0000","label":"checkBox2"}},{"type":"Box","props":{"y":197,"x":41,"var":"box"},"child":[{"type":"ProgressBar","props":{"y":70,"width":150,"skin":"comp/progress.png","sizeGrid":"4,4,4,4","name":"progress","height":14}},{"type":"Label","props":{"y":103,"width":137,"text":"This is a Label","skin":"comp/label.png","name":"label","height":26,"fontSize":20}},{"type":"TextInput","props":{"y":148,"width":150,"text":"textinput","skin":"comp/textinput.png","name":"input"}},{"type":"HSlider","props":{"width":150,"skin":"comp/hslider.png","name":"slider"}},{"type":"HScrollBar","props":{"y":34,"width":150,"skin":"comp/hscroll.png","name":"scroll"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}
