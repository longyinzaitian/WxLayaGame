class WxFileMgr {


    private beginLoad(): void {
		Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/second.atlas"], null);
		var that = this;
		if (Laya.Browser.onWeiXin) {
			var fileMgr: FileSystemManager = wx.getFileSystemManager();
			fileMgr.access({
				path: wx.env.USER_DATA_PATH + '/music/music.wav',
				success: function(res) {
					console.log('access res:', res);
					AudioMgr.playMusic(wx.env.USER_DATA_PATH + '/music/music.wav');
				},
				fail: function(res) {
					console.log('access file fail.', res);
						wx.downloadFile({
							url: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201808/10453.wav',
							header: '',
							filePath: '',
							success: function(res) {
								console.log('down load file success.', res);
								that.saveMusicFile(res.tempFilePath);
							},
							fail: function(res) {
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
			success: function(savedFiles) {
				console.log('saved files:', savedFiles);
				var fileList = savedFiles.fileList as Array<any>;
				for(var i=0; i<fileList.length; i++) {
					fileMgr.removeSavedFile({
						filePath: fileList[i].filePath,
						success: function(r) {
							console.log('remove save file. success.', r);
						},
						fail: function(r) {
							console.log('remove save file.', r);
						}
					});
				}
			},
			fail: function(savedFiles) {
				console.log('saved files fail.', savedFiles);
			}
		});
		fileMgr.saveFile({
			tempFilePath: tempPath,
			success: function(data) {
				console.log('save file:', data);
				fileMgr.mkdir({
					dirPath: wx.env.USER_DATA_PATH + 'music',
					success: function(res) {
						console.log('mkdir success:', res);
						fileMgr.copyFile({
							srcPath: data.savedFilePath,
							destPath: wx.env.USER_DATA_PATH + '/music/music.wav',
							success: function(result) {
								console.log('copy file :', result);
								AudioMgr.playMusic(wx.env.USER_DATA_PATH + '/music/music.wav');
							},
							fail: function(result) {
								console.log('copy file fail>', result);
							}
						});
					},
					fail: function(res) {
						console.log('mkdir fail res:', res);
					}
				});
			},
			fail: function(data) {
				console.log('save file fail:', data);
			}
		});
	}
}
