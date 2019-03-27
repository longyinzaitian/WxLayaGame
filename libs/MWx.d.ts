
declare namespace wx {
  function showShareMenu();
  function onShareAppMessage(any);
  function getFileSystemManager();
  let env: any;
  function downloadFile(any);
  function onShow(any);
  function getLaunchOptionsSync();
  function onHide(any);
  function unlink(any);
}

declare class FileSystemManager {
  public access(any);
  public mkdir(any);
  public getSavedFileList(any);
  public removeSavedFile(any);
  saveFile(any);
  copyFile(any);
  unlink(any);
}

declare class RecorderManager {
  onStart(any);
  onPause(any);
  onResume(any);
  onStop(any);
  onError(any);
  onInterruptionBegin(any);
  onInterruptionEnd(any);
  start(any);
  pause();
  resume();
  stop();
}

declare class StateMachine {
  constructor(any);
}