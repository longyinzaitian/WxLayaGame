import { ui } from "../../ui/layaMaxUI";
import { INDEX_SCENE } from "../utils/Consts";

export default class ViewPagerScene extends ui.test.ViewPageSceneUI {

    private static LEFT: string = 'left';
    private static RIGHT: string = 'right';
    private static MOVE_DUR: number = 300;
    private static MOVE_MIN_DIS: number = 0;
    private static CONTAINER_LEFT_MAX: number = 35;
    private static CONTAINER_LEFT_MIN: number = -650;
    private static CONTAINER_MOVE_YU: number = Math.abs(ViewPagerScene.CONTAINER_LEFT_MIN)/5;
    private static MOVE_DIS: number = (ViewPagerScene.CONTAINER_LEFT_MAX - ViewPagerScene.CONTAINER_LEFT_MIN);

    private _dir: string = ViewPagerScene.LEFT;
    

    constructor() {
        super();
    }

    onEnable() {
        this.mCloseBtn.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.close(INDEX_SCENE.VIEW_PAGER_PAGE);
        });

        this.mBtnFirst.on(Laya.Event.CLICK, this, () => {
            if (this._dir == ViewPagerScene.LEFT) {
                return;
            }
            this.moveToLeft(ViewPagerScene.MOVE_DUR);
        });

        this.mBtnSecond.on(Laya.Event.CLICK, this, () => {
            if (this._dir == ViewPagerScene.RIGHT) {
                return;
            }
            this.moveToRight(ViewPagerScene.MOVE_DUR);
        });

        this.mContainer.on(Laya.Event.MOUSE_DOWN, this, (event) => {
            this.onMouseXDown(event.target.mouseX);
        });

        this.mContainer.on(Laya.Event.MOUSE_MOVE, this, (event) => {
            this.onMouseXMove(event.target.mouseX);
        });

        this.mContainer.on(Laya.Event.MOUSE_UP, this, (event) => {
            this.onMouseXUp(event.target.mouseX);
        });

        this.mContainer.on(Laya.Event.MOUSE_OUT, this, (event) => {
            this.onMouseXUp(event.target.mouseX);
        });

        this.setList();
    }

    private setList(): void {
        let dataSource: Array<any> = new Array();
        for (let i = 0; i < 20; i++) {
            dataSource.push('item index ' + i);
        }
        this.mList.dataSource = dataSource;
        this.mList.renderHandler = Laya.Handler.create(this, (item: Laya.Box, index: number) => {
            (item.getChildAt(0) as Laya.Label).text = 'item index '+ index;
        }, null, false);
    }

    private _onMouseXDown: number = 0;
    private _MoveDir: number = 0;
    private onMouseXDown(mouseX: number): void {
        Laya.Tween.clearTween(this.mContainer);
        this._onMouseXDown = mouseX;
    }

    private onMouseXMove(mouseX: number): void {
        Laya.Tween.clearTween(this.mContainer);
        let moveDis = mouseX - this._onMouseXDown;
        let containerLeft: number = this.mContainer.left;
        this._MoveDir = moveDis > 0 ? 1 : -1;
        containerLeft += moveDis;
        if (containerLeft >= ViewPagerScene.CONTAINER_LEFT_MAX + ViewPagerScene.CONTAINER_MOVE_YU && this._MoveDir == 1) {
            // containerLeft = ViewPagerScene.CONTAINER_LEFT_MAX;
            containerLeft -= moveDis;
        } else if (containerLeft <= ViewPagerScene.CONTAINER_LEFT_MIN - ViewPagerScene.CONTAINER_MOVE_YU && this._MoveDir == -1) {
            // containerLeft = ViewPagerScene.CONTAINER_LEFT_MIN;
            containerLeft -= moveDis;
        }
        this.mContainer.left = containerLeft;
    }

    private onMouseXUp(mouseX: number): void {
        let containerLeft = this.mContainer.left;
        if (this._MoveDir > 0) {
            if (containerLeft - ViewPagerScene.CONTAINER_LEFT_MIN > ViewPagerScene.CONTAINER_MOVE_YU) {
                this.moveToLeft(ViewPagerScene.MOVE_DUR * (ViewPagerScene.CONTAINER_LEFT_MAX - containerLeft)/ViewPagerScene.MOVE_DIS);

            } else {
                this.moveToRight(ViewPagerScene.MOVE_DUR * (containerLeft - ViewPagerScene.CONTAINER_LEFT_MIN)/ViewPagerScene.MOVE_DIS);
            }

        } else if (this._MoveDir < 0) {
            if (ViewPagerScene.CONTAINER_LEFT_MAX - containerLeft > ViewPagerScene.CONTAINER_MOVE_YU) {
                this.moveToRight(ViewPagerScene.MOVE_DUR * (containerLeft - ViewPagerScene.CONTAINER_LEFT_MIN)/ViewPagerScene.MOVE_DIS);

            } else {
                this.moveToLeft(ViewPagerScene.MOVE_DUR * (ViewPagerScene.CONTAINER_LEFT_MAX - containerLeft)/ViewPagerScene.MOVE_DIS);
            }
        }
    }

    private moveToLeft(dur: number): void {
        this._dir = ViewPagerScene.LEFT;
        Laya.Tween.to(this.mContainer, {left: ViewPagerScene.CONTAINER_LEFT_MAX},
            dur,
            Laya.Ease.linearNone,
            Laya.Handler.create(this, () => {
                this.mContainer.left = ViewPagerScene.CONTAINER_LEFT_MAX;
            }, null, false)
        );
    }

    private moveToRight(dur: number): void {
        this._dir = ViewPagerScene.RIGHT;
        Laya.Tween.to(this.mContainer, {left: ViewPagerScene.CONTAINER_LEFT_MIN},
            dur,
            Laya.Ease.linearNone,
            Laya.Handler.create(this, () => {
                this.mContainer.left = ViewPagerScene.CONTAINER_LEFT_MIN;
            }, null, false)
        );
    }
}