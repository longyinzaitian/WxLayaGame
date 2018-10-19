
class ToastUtil {
    public static showToast(msg: String): void {
        wx.showToast({
            title: msg,
        });
    }
}