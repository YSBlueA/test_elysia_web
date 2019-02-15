
class ScenePrologue extends Phaser.Scene {

    endFlag = false;

    constructor(config) {
        super({
            key: 'PrologueScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'PrologueScene' });
    }

    //game: Phaser.Game;
    init() {
        console.log('[GAME] init');
    }

    preload() {
    }

    create() {
		this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'prologue_background');
        var data = this.cache.text.get('prologue');
        uiTWcreate(this, data);

    }
    update() {
        
        if (this.endFlag == false) {
            if (uiTWnextLine(this) == 0) {
                this.endFlag = true;
                this.time.delayedCall(3000, this.nextMainScene, null, this);
            }
        }
    }

    nextMainScene() {
        DataBaseUpdateStory(1, this.callback);
    }

    callback(result) {
        if (result == 0) {
            console.log('FAIL : UPDATE STORY ');
        } else {
            game.scene.switch('PrologueScene', 'MainScene');
        }
    }
}
