
class SceneShop extends Phaser.Scene {

    endFlag = false;

    constructor(config) {
        super({
            key: 'ShopScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'ShopScene' });

    }

    init() {
        console.log('[GAME] init');
    }

    preload() {

    }

    create() {

        var postionX = this.game.canvas.width / 2;
        var postionY = this.game.canvas.height - (this.textures.get('btn_random').getSourceImage().height) / 2;
        var btn_tex = this.textures.get('btn_random');
        var intervalX = (btn_tex.getSourceImage().width / 2) * 3;


        var bg = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'shop_background');

		var backKey = this.add.sprite(32, 32, 'Sceneback');
		backKey.setOrigin(0, 0);
        backKey.setInteractive();
        
        backKey.on('pointerdown', this.onBackKeyClicked);

        var btn_random = this.add.sprite(postionX, postionY, 'btn_random');
        var style_btn_random = { fontFamily: 'Arial', fontSize: '24px', fill: "#ff0044", wordWrap: true, wordWrapWidth: btn_random.width, align: "center", backgroundColor: "#ffff00" };
        var tx_random = this.add.text(32, 32, 'RANDOM', style_btn_random);

        btn_random.setInteractive();
        btn_random.on('pointerdown', this.onRandomClicked);

        tx_random.x = Math.floor(btn_random.x - tx_random.width / 2);
        tx_random.y = Math.floor(btn_random.y - tx_random.height / 2);

    }
    update() {
    }

    onBackKeyClicked() {
        console.log(' start Back Scene ');
        game.scene.switch('ShopScene', 'MainScene');
    }

    onRandomClicked() {
        console.log(' start Random Scene ');
        game.scene.switch('ShopScene', 'RandomScene');
    }

}
