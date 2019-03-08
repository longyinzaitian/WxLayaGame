export default class AudioMgr{
    constructor() {

    }

    public static playMusic(filePath): void {
        Laya.SoundManager.playMusic(filePath, 1, Laya.Handler.create(null, this.onMusicPlayComplete));
    }

    private static onMusicPlayComplete(): void {
        console.log('on music play complete');
    }

    public static playSound(): void {
        Laya.SoundManager.playSound('effect/10467.wav', 1, Laya.Handler.create(null, this.onSoundPlayComplete));
    }

    private static onSoundPlayComplete(): void {
        console.log('on sound play complete');
    }
}