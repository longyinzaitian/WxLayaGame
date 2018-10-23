module script {
    export class GameScript {

    /**攻击速度**/
        public speed: number = 0;
        /**人物名称**/
        public userName: string = "";
        /**记录状态**/
        private boo: boolean = false;
        /**定义一个变量来接收Box组件实例**/
        private monkeyBox: Laya.Sprite;
        constructor() {
        }
        /**
         *设置owner函数，可以直接获取到添加附加脚本的组件实例 
         **/
        public set owner(value: any) {
            this.monkeyBox = value;
            //自定义的脚本会有时序问题，所以在此添加一个延时
            this.monkeyBox.frameOnce(2, this, this.onLoaded);
        }
        private onLoaded(): void {
            //通过子元素的name值获取该对象
            var userN: Laya.Label = this.monkeyBox.getChildByName("userN") as Laya.Label;
            //设置文本内容为属性栏中给的值
            userN.text = this.userName;
            this.monkeyBox.frameLoop(1, this, this.onLoop);
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
}