import { ui } from "../../ui/layaMaxUI";
import Main from "../../Main";

export default class BonesPageUI extends ui.test.BonesViewSceneUI {
    private static BODY = 'body';
    private static HAIR = 'hair';
    private tActionID:number=0;
    private mIsLoop: boolean = false;
    private skeleton:Laya.Skeleton;
    private template: Laya.Templet;
    private texTure: Laya.Texture;
    private originBodyTexture: Laya.Texture;
    private originHairTexture: Laya.Texture;
    private isBodyOrigin: boolean = true;
    private isHairOrigin: boolean = true;
    private isFirstChangeSkin: boolean = true;

    constructor() {
        super();
    }

    onEnable() {
        this.playBones();
        this.addBtn();
    }

    private playBones(): void {
        this.template = new Laya.Templet();
        //通过加载直接创建动画
        this.template.loadAni("bones/Sheep_Ani.sk");
        this.template.on(Laya.Event.COMPLETE, this, this.loadAniComplete);
        Laya.loader.load('comp/clip_selectBox.png', Laya.Handler.create(this, function() {
            this.texTure = Laya.loader.getRes('comp/clip_selectBox.png');
            console.log('tex ture:', this.texTure);
        }));
    }

    private loadAniComplete(): void {
        this.skeleton = this.template.buildArmature(1);
        this.skeleton.pos(375, 600);
        //添加到舞台
        this.addChild(this.skeleton);
        this.registerSkeleton();
        this.originBodyTexture = this.template.subTextureDic['Sheep_01_Body'];
        this.originHairTexture = this.template.subTextureDic['Sheep_01_Hair'];
        console.log('sub texture dic:', this.template.subTextureDic);
        console.log('src bone matrix arr:', this.template.srcBoneMatrixArr);
        console.log('skin dic:', this.template.skinDic);
        console.log('skin data array:', this.template.skinDataArray);
        console.log('path arr：', this.template.pathArr);
        console.log('root bone:', this.template.mRootBone);
        console.log('bone arr:', this.template.mBoneArr);
        console.log('bone slot dic:', this.template.boneSlotDic);
        console.log('bone slot arr:', this.template.boneSlotArray);
        console.log('bind bone bone slot dic:', this.template.bindBoneBoneSlotDic);
    }
    private registerSkeleton(): void {
        this.skeleton.on(Laya.Event.PAUSED, this, (res) => {
            console.log('skeleton paused.', res);
        });
        this.skeleton.on(Laya.Event.PLAYED, this, (res) => {
            console.log('skeleton play.', res);
        });
        this.skeleton.on(Laya.Event.STOPPED, this, (res) => {
            console.log('skeleton stopped.', res);
        });
        this.skeleton.player.on(Laya.Event.COMPLETE, this, (res) => {
            console.log('player complete:', res);
        });
        this.skeleton.player.on(Laya.Event.PLAYED, this, (res) => {
            console.log('player play:', res);
            this.printLog();
            
        });
        this.skeleton.player.on(Laya.Event.STOPPED, this, (res) => {
            console.log('player stop:', res);
            this.printLog();
        });
        
    }

    private printLog(): void {
        console.log('cur anim clip index:', this.skeleton.player.currentAnimationClipIndex,
                ', cur frame time:', this.skeleton.player.currentFrameTime,
                ', cur key frame index:', this.skeleton.player.currentKeyframeIndex,
                ', cur play time:', this.skeleton.player.currentPlayTime,
                ', cur time:', this.skeleton.player.currentTime,
                ', play duration: ', this.skeleton.player.playDuration,
                ', play end:', this.skeleton.player.playEnd,
                ', play start:', this.skeleton.player.playStart,
                ', state:', this.skeleton.player.state);
    }

    private addBtn(): void {
        this.mLoop.on(Laya.Event.CLICK, this, () => {
            this.mIsLoop = !this.mIsLoop;
            if (this.mIsLoop) {
                this.mLoop.changeText("循环： Yes");
            } else {
                this.mLoop.changeText("循环： No");
            }
        });

        this.mSleep.on(Laya.Event.CLICK, this, () => {
            this.playAnimById(0);
        });
        this.mStand.on(Laya.Event.CLICK, this, () => {
            this.playAnimById(1);
        });
        this.mWalk.on(Laya.Event.CLICK, this, () => {
            this.playAnimById(2);
        });
        this.mEat.on(Laya.Event.CLICK, this, () => {
            this.playAnimById(3);
        });
        this.mRun.on(Laya.Event.CLICK, this, () => {
            this.playAnimById(4);
        });
        this.mCloseBtn.on(Laya.Event.CLICK, this, () => {
            this.skeleton.stop();
            Laya.Scene.close('test/BonesViewScene.scene');
        });
        this.mChangeSkin.on(Laya.Event.CLICK, this, this.changeSkin);
        this.mchangeHair.on(Laya.Event.CLICK, this, this.changeHairSkin);
    }

    private changeSkin(): void {
        if (this.isBodyOrigin) {
            this.skeleton.setSlotSkin(BonesPageUI.BODY, this.texTure);
            this.isBodyOrigin = false;
            if (this.isFirstChangeSkin) {
                this.isFirstChangeSkin = false;
                // Laya.timer.once(200, this, () => {
                    // this.skeleton.setSlotSkin(BonesPageUI.BODY, this.texTure);
                // });
            }
        } else {
            this.skeleton.setSlotSkin(BonesPageUI.BODY, this.originBodyTexture);
            this.isBodyOrigin = true;
        }
    }

    private changeHairSkin(): void {
        if (this.isHairOrigin) {
            this.skeleton.setSlotSkin(BonesPageUI.HAIR, this.texTure);
            this.isHairOrigin = false;
        } else {
            this.skeleton.setSlotSkin(BonesPageUI.HAIR, this.originHairTexture);
            this.isHairOrigin = true;
        }
    }

    private playAnimById(actionId: number): void {
        let name = this.skeleton.getAniNameByIndex(actionId);
        this.setAnimLabel('动画名称索引：' + actionId + ' -> ' + name);
        //切换播放的动画
        this.skeleton.play(actionId, this.mIsLoop);
    }

    private setAnimLabel(label: string): void {
        this.mAnimLabel.changeText(label);
    }
}