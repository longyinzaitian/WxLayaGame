import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

class GameMain {
	public static testUI: TestPageUI;
	public static indexPage: IndexPage;
	public static bonesPage: BonesPageUI;
	public static recordPage: RecordPageUI;
	public static roundCirclePage: RoundCirclePage;

	constructor() {
		//初始化微信小游戏
		Laya.MiniAdpter.init();
		//程序入口
		Laya.init(750, 1334, WebGL);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		//画布垂直居中对齐
		Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
		//画布水平居中对齐
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.bgColor = "gray";
		//激活资源版本控制
		// Laya.ResourceVersion.enable("version.json", Handler.create(null, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
		// this.beginLoad();
		this.registerVisibleChange();
		var resources = ["res/atlas/comp.atlas",
						 "res/atlas/second.atlas",
						 "res/atlas/roundpro.atlas",
						 "bones/Sheep_Ani.png"];
		Laya.loader.load(resources, Laya.Handler.create(this, this.onLoaded));
		Laya.loader.load("bones/Sheep_Ani.sk",null,null,Loader.BUFFER);

		new StateMachineUtil();
	}

	private registerVisibleChange(): void {
		if (Laya.Browser.onWeiXin) {
			var launchOption = wx.getLaunchOptionsSync();
			console.log('on launch option:', launchOption);
			wx.onShow(function(res) {
				console.log('on show:', res);
			});

			wx.onHide(function(res) {
				console.log('on hide', res);
				new DownloadFileUtil('music').removeSavedFiles();
			});
		}
	}

	private onLoaded(): void {
		//实例UI界面
		if (!GameMain.indexPage) {
			GameMain.indexPage = new IndexPage();
		}
		Laya.stage.addChild(GameMain.indexPage);
	}
}

new GameMain();