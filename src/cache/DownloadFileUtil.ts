class DownloadFileUtil {
    private mFileMgr: FileSystemManager;
    private mFileDir: string;
    constructor(fileDir: string) {
        this.mFileDir = fileDir;
        if (Laya.Browser.onWeiXin) {
            this.mFileMgr = wx.getFileSystemManager();
        }
    }

    public checkDir(checkSucHandler: Laya.Handler, checkFailHandler: Laya.Handler): void {
        if (!Laya.Browser.onWeiXin) {
            return;
        }
        //利用access方法判断文件是否可用
        this.mFileMgr.access({
            path: wx.env.USER_DATA_PATH + '/' + this.mFileDir,
            success: function(res) {
                console.log('check success:', res);
                checkSucHandler.run();
            },
            fail: function(res) {
                console.log('check fail.', res);
                checkFailHandler.run();
            }
        });
    }

    public mkDir(makeSucHandler: Laya.Handler, makeFailHandler: Laya.Handler): void {
        if (!Laya.Browser.onWeiXin) {
            return;
        }
        this.mFileMgr.mkdir({
                dirPath: wx.env.USER_DATA_PATH + '/' + this.mFileDir,
                success: function(res) {
                    console.log('mk dir success:', res);
                    makeSucHandler.run();
                },
                fail: function(res) {
                    console.log('mk dir fail:', res);
                    makeFailHandler.run();
                }
        });
    }

    public downloadFile(url: string, fileName: string, downloadSucHandler: Laya.Handler, downloadFailHandler: Laya.Handler): void {
        if (!Laya.Browser.onWeiXin) {
            return;
        }
        wx.downloadFile({
            url: url,
            header: '',
            filePath: wx.env.USER_DATA_PATH + '/' + this.mFileDir + '/' + fileName,
            success: function(res) {
                console.log('down load file. suc:', res);
                downloadSucHandler.run();
            },
            fail: function(res) {
                console.log('down load file. fail:', res);
                downloadFailHandler.run();
            },
        });
    }

    public removeSavedFiles(): void {
        this.mFileMgr.getSavedFileList({
            success: function(savedFiles) {
                console.log('saved files list:', savedFiles);
                var fileList = savedFiles.fileList as Array<any>;
                for(var i=0; i<fileList.length; i++) {
                    this.mFileMgr.removeSavedFile({
                        filePath: fileList[i].filePath,
                        success: function(r) {
                            console.log('remove save file. success:', r);
                        },
                        fail: function(r) {
                            console.log('remove save file. fail:', r);
                        }
                    });
                }
            },
            fail: function(res) {
                console.log('get saved file list. fail:', res);
            }
        });
    }

    public removeSavedFile(filePath: string, removeFileSucHandler?: Laya.Handler,
                                    removeFileFailHandler?: Laya.Handler): void {
        this.mFileMgr.removeSavedFile({
            filePath: filePath,
            success: function(res) {
                console.log('remove save file. suc:', res);
                if (removeFileSucHandler) {
                    removeFileSucHandler.run();
                }
            },
            fail: function(res) {
                console.log('remove save file. fail:', res);
                if (removeFileFailHandler) {
                    removeFileFailHandler.run();
                }
            }
        });
    }
}