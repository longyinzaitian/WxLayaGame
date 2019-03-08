
export default class ToastUtil {
    public static showToast(msg: string): void {
        wx.showToast({
            title: msg,
            icon:"",
            duration: 2000,
            mask: true,
            image: "",
            success: null,
            fail: null,
            complete: null,
        });
    }
}