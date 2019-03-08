
export default class GameScript extends Laya.Script {

    /** @prop {name: speed, tips: "攻击速度", type: number} */
    speed: number = 0;
    /** @prop { name: userName, tips: "人物名称", type: string} */
    userName: String = "";

    /**记录状态**/
    private boo: boolean = false;
    /**定义一个变量来接收Box组件实例**/
    private monkeyBox: Laya.Sprite;
    
    constructor() {
        super();
    }


    onEnable() {
        console.log('Game script. on enable.');
    }
    /**
     * 设置owner函数，可以直接获取到添加附加脚本的组件实例 
    **/
    public startAnim() {
        //自定义的脚本会有时序问题，所以在此添加一个延时
        this.owner.frameOnce(2, this, this.onLoaded);
    }
    private onLoaded(): void {
        this.monkeyBox = this.owner as Laya.Sprite;
        //通过子元素的name值获取该对象
        var userN: Laya.Label = this.owner.getChildByName("userN") as Laya.Label;
        //设置文本内容为属性栏中给的值
        userN.text = this.userName.toString();
        this.owner.frameLoop(1, this, this.onLoop);
    }
    /*
    设置帧循环，实现左右移动
    */
    private onLoop(): void {
        if (this.monkeyBox.x <= 0) {
            this.boo = false;
            this.monkeyBox.x += this.speed;
        }
        else if (this.monkeyBox.x < Laya.stage.width - this.monkeyBox.width && this.boo == false) {
            this.monkeyBox.x += this.speed;
        }
        else if (this.monkeyBox.x >= Laya.stage.width - this.monkeyBox.width || this.boo == true) {
            this.monkeyBox.x -= this.speed;
            this.boo = true;
        }
    }
}