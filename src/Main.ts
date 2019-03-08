import GameConfig from "./GameConfig";
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;
import TestPageUI from "./script/page/TestPageUI";
import IndexPage from "./script/page/IndexPage";
import BonesPageUI from "./script/page/BonesPageUI";
import RecordPageUI from "./script/page/RecordPage";
import RoundCirclePage from "./script/page/RoundCirclePage";
import StateMachineUtil from "./script/utils/StateMachineUtil";
import EventDispatch from "./script/component/EventDispatch";
import DownloadFileUtil from "./script/cache/DownloadFileUtil";
import ExpandPageScene from "./script/page/ExpandPageScene";

export default class Main {

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		this.registerVisibleChange();
		var resources = ["res/atlas/comp.atlas",
			"res/atlas/test.atlas", "res/atlas/test.png",
			"res/atlas/second.atlas",
			"res/atlas/roundpro.atlas",
			"bones/Sheep_Ani.png"];
		Laya.loader.load(resources, Laya.Handler.create(this, this.onLoaded));
		Laya.loader.load("bones/Sheep_Ani.sk", null, null, Loader.BUFFER);

		new StateMachineUtil();
	}

	private registerVisibleChange(): void {
		if (Laya.Browser.onWeiXin) {
			var launchOption = wx.getLaunchOptionsSync();
			wx.onShow((res) => {
				console.log('on show:', res);
			});

			wx.onHide((res) => {
				console.log('on hide');
				new DownloadFileUtil('music').removeSavedFiles();
			});
		}
	}

	private onLoaded(): void {
		//实例UI界面
		Laya.Scene.open('test/IndexPageScene.scene');

		EventDispatch.register("test_event", this, this.onEventTest);
		EventDispatch.register("test_event", this, () => {
			console.log('test event.');
		});
		this.testDispatchEvent();
	}

	// //测试Event事件顺序执行，非异步
	private mTestHandler: Laya.Handler = Laya.Handler.create(this, this.onTestHandler, null, false);
	private onEventTest(): void {
		let level: number = Math.floor(Math.random() * 10);
		this.mTestHandler.runWith([level]);
	}

	private onTestHandler(level: number): void {
		console.log('on test handler. level:', level, ', j:', this.j);
	}

	private j: number;

	private testDispatchEvent(): void {
		for (let i = 0; i < 5; i++) {
			this.j = i;
			EventDispatch.event('test_event');
		}
	}
}
//激活启动类
new Main();
