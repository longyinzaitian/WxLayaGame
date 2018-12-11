class MsgCtrl {

    private msgArray: Array<Message>;
    constructor() {
        this.msgArray = new Array<Message>();
    }

    public addMsg(msg: Message): void {
        this.msgArray.push(msg);
    }

    public removeMsg(msgId: string): void {
        let indexRemove: number = -1;
        this.msgArray.map((value, index) => {
            if (msgId === value.id) {
                indexRemove = index;
            }
        });
        if (indexRemove >= 0) {
            this.msgArray.splice(indexRemove, 1);
        }
    }

    public updateMsg(msg: Message): void {
        this.msgArray.map((value, index) => {
            if (msg.id === value.id) {
                this.msgArray[index] = msg;
            }
        });
    }

    public getMsg(msgId: string): Message {
        let msg: Message;
        this.msgArray.map((value, index) => {
            if (msgId == value.id) {
                msg = value;
            }
        });
        return msg;
    }
}