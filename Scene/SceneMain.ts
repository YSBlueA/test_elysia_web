
class SceneMain extends Phaser.Scene {

    constructor(config) {
        super({
            key: 'MainScene',
            physics: {
                system: 'impact',
                gravity: 100
                /*,
                setBounds: {
                    width: 800,
                    height: 600,
                }
                */
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'MainScene' });

    }

    //game: Phaser.Game;
    init() {
        console.log('[GAME] init');
    }

    preload() {

    }

    create() {
        var bg = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'background');

        var postionX = this.game.canvas.width / 2;
        var postionY = this.game.canvas.height - (this.textures.get('btn_stage').getSourceImage().height) / 2;
        var btn_tex = this.textures.get('btn_stage');
        var intervalX = (btn_tex.getSourceImage().width / 2) * 3;


        /* 
         스테이지 버튼 UI
         */
        var btn_stage = this.add.sprite(postionX, postionY, 'btn_stage');
		var tx_stage = this.add.text(0, 0, 'Stage', gTextBtnUiStyle);

        btn_stage.setInteractive();
        btn_stage.on('pointerdown', this.onStageClicked);

        tx_stage.x = Math.floor(btn_stage.x - tx_stage.width / 2);
        tx_stage.y = Math.floor(btn_stage.y - tx_stage.height / 2);

        /*
         PVP 버튼 UI
        */

        /*
         * 덱 설정 UI
        */
        postionX += intervalX;
        var btn_deck = this.add.sprite(postionX, postionY, 'btn_deck');
		var tx_deck = this.add.text(0, 0, 'DECK', gTextBtnUiStyle);
        btn_deck.setInteractive();
        btn_deck.on('pointerdown', this.onDeckClicked);
        tx_deck.x = Math.floor(btn_deck.x - tx_deck.width / 2);
        tx_deck.y = Math.floor(btn_deck.y - tx_deck.height / 2);

        /*
         상점 버튼 UI
        */
        postionX += intervalX;
        var btn_shop = this.add.sprite(postionX, postionY, 'btn_shop');
		var tx_shop = this.add.text(0, 0, 'Shop', gTextBtnUiStyle);
        btn_shop.setInteractive();
        btn_shop.on('pointerdown', this.onShopClicked);
        tx_shop.x = Math.floor(btn_shop.x - tx_shop.width / 2);
        tx_shop.y = Math.floor(btn_shop.y - tx_shop.height / 2);

    }

    onStageClicked() {
        console.log(' start Stage ');
        game.scene.switch('MainScene', 'StoryScene');
    }

    onShopClicked() {
        console.log(' start Shop ');
        game.scene.switch('MainScene', 'ShopScene');
    }

    onDeckClicked() {
        console.log(' start Deck ');
        game.scene.switch('MainScene', 'DeckCardScene');
    }
}
