
class SceneRandom extends Phaser.Scene {

    constructor(config) {
        super({
            key: 'RandomScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'RandomScene' });
        gRandomSceneStated = false;

    }

    init(config) {
        console.log('[GAME] init');
    }

    preload(data) {

    }

    create(data) {
        this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'random_background');

        gRandomSceneStated = true;
        DataBaseGetCard(this.callback);
    }

    update() {
        console.log(' update Random Scene ');
        if (gRandomSceneStated == false) {
            gRandomSceneStated = true;
            DataBaseGetCard(this.callback);
        }
    }

    callback(result) {
        if (result == 0) {
            console.log('FAIL : get card ');
        } else {
            console.log('succ : get card  : ' + result);
            gRandomSceneStated = false;
            game.scene.switch('RandomScene', 'ShopScene');
        }
    }

}
