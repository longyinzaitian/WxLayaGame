import AudioMgr from "./AudioMgr";

export default class WxFileMgr {


    private beginLoad(): void {
		Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/second.atlas"], null);
		var that = this;
		if (Laya.Browser.onWeiXin) {
			var fileMgr: FileSystemManager = wx.getFileSystemManager();
			fileMgr.access({
				path: wx.env.USER_DATA_PATH + '/music/music.wav',
				success: (res) => {
					console.log('access res:', res);
					AudioMgr.playMusic(wx.env.USER_DATA_PATH + '/music/music.wav');
				},
				fail: (res) => {
					console.log('access file fail.', res);
						wx.downloadFile({
							url: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201808/10453.wav',
							header: '',
							filePath: '',
							success: (res) => {
								console.log('down load file success.', res);
								that.saveMusicFile(res.tempFilePath);
							},
							fail: (res) => {
								console.log('down load file fail.', res);
							},
						});
				}
			});
		}
	}

	private saveMusicFile(tempPath): void {
		var fileMgr: FileSystemManager = wx.getFileSystemManager();
		fileMgr.getSavedFileList({
			success: (savedFiles) => {
				console.log('saved files:', savedFiles);
				var fileList = savedFiles.fileList as Array<any>;
				for(var i=0; i<fileList.length; i++) {
					fileMgr.removeSavedFile({
						filePath: fileList[i].filePath,
						success: (r) => {
							console.log('remove save file. success.', r);
						},
						fail: (r) => {
							console.log('remove save file.', r);
						}
					});
				}
			},
			fail: (savedFiles) => {
				console.log('saved files fail.', savedFiles);
			}
		});
		fileMgr.saveFile({
			tempFilePath: tempPath,
			success: (data) => {
				console.log('save file:', data);
				fileMgr.mkdir({
					dirPath: wx.env.USER_DATA_PATH + 'music',
					success: (res) => {
						console.log('mkdir success:', res);
						fileMgr.copyFile({
							srcPath: data.savedFilePath,
							destPath: wx.env.USER_DATA_PATH + '/music/music.wav',
							success: (result) => {
								console.log('copy file :', result);
								AudioMgr.playMusic(wx.env.USER_DATA_PATH + '/music/music.wav');
							},
							fail: (result) => {
								console.log('copy file fail>', result);
							}
						});
					},
					fail: (res) => {
						console.log('mkdir fail res:', res);
					}
				});
			},
			fail: (data) => {
				console.log('save file fail:', data);
			}
		});
	}
}
