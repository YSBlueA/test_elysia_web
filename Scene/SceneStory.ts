
class SceneStory extends Phaser.Scene {

    endFlag = false;

    constructor(config) {
        super({
            key: 'StoryScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'StoryScene' });

    }

    init() {
        console.log('[GAME] init');
    }

    preload() {
        console.log("stage gstory:" + gStory);
    }

    create() {
        this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'stage1_background');

		var backKey = this.add.sprite(32, 32, 'Sceneback');
		backKey.setOrigin(0, 0);
        backKey.setInteractive();

        backKey.on('pointerdown', this.onBackKeyClicked);


        if (gStory < 10) {
            Stage1Sprite(this);
        }

    }
    update() {
    }

    onBackKeyClicked() {
        console.log(' start Back Scene ');
        game.scene.switch('StoryScene', 'MainScene');
    }
}
