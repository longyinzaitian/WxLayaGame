class HumanView extends ui.test.HumanViewUI {

    constructor() {
        super();
        this.initImage();
    }

    private initImage(): void {
        let randomIndex = Math.round(Math.random() * 10)%2 == 0 ? 'second/human.png' : 'second/human2.png';
        this.img.loadImage(randomIndex, 0, 0, 30, 30);
    }
}