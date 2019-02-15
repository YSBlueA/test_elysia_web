
class SceneLogin extends Phaser.Scene {

    constructor(config) {
        super({
            key: 'LoginScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'LoginScene' });

    }

    init(config) {
        console.log('[GAME] init');
    }

    preload() {
        var progressX = (this.cameras.main.width / 2) - 153;
        var progressY = (this.cameras.main.height / 2) - 31;
        var progressW = 320;
        var progressH = 50;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(progressX, progressY, progressW, progressH);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(Math.round(+value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(progressX + 10, progressY + 10, (progressW - 20) * value, progressH - 20);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });


        this.load.image('logo', './assets/image/login.png');
        this.load.image('blogin', './assets/image/google_login.png');

		/* Prologue Scene */
		this.load.image('prologue_background', './assets/image/main_background.jpg');
		this.load.text('prologue', './assets/txt/prologue.txt');

        /* Main Scene */
        this.load.image('background', './assets/image/main_background.jpg');
        this.load.image('ch_help', './assets/image/ch_help.png');

        this.load.image('btn_stage', './assets/image/ui_btn_main.png');
        this.load.image('btn_shop', './assets/image/ui_btn_main.png');

        this.load.image('btn_deck', './assets/image/ui_btn_main.png');


        /* Story Scene */
        this.load.image('Sceneback', './assets/image/ui_back.png');

        Stage1Create(this);
        this.load.image('stage1_background', './assets/image/stage1_background.png');


        /* Shop Scene */
        this.load.image('shop_background', './assets/image/stage1_background.png');
        this.load.image('Sceneback', './assets/image/ui_back.png');
        this.load.image('btn_random', './assets/image/ui_btn_random.png');

        /* Random Scene */
        this.load.image('random_background', './assets/image/bg_random.png');

        /* DeckCard Scene */
        this.load.image('deck_background', './assets/image/login.jpg');
        this.load.image('Sceneback', './assets/image/ui_back.png');

        this.load.image('ui_course_up', './assets/image/ui_course_up.png');
        this.load.image('ui_course_right', './assets/image/ui_course_right.png');
        this.load.image('ui_course_down', './assets/image/ui_course_down.png');
        this.load.image('ui_course_left', './assets/image/ui_course_left.png');

		this.load.image('card1_list', './assets/image/card_1/card_list.png');

		this.load.image('card1_body', './assets/image/card_1/card1_body.jpg');
		this.load.image('ui_char_body', './assets/image/ui_char_body.png');


        /* Battle Scene */
        this.load.image('ui_my_character', './assets/image/ui_my_character.png');
        this.load.image('ui_tile_l', './assets/image/ui_tile_bottom_l.png');
        this.load.image('ui_tile_r', './assets/image/ui_tile_bottom_r.png');

        this.load.image('cd1_face', './assets/image/card_1/card_face.png');
        this.load.image('ui_btn_next', './assets/image/ui_btn_next.png');

        this.load.image('enemy_1_1', './assets/image/enemy/enemy1_1.png');

        this.load.atlas('sp_card1_r_att', './assets/image/card_1/card1_att_r_96x58.png', './assets/image/card_1/card1_att_r.json');
        this.load.atlas('sp_card1_l_att', './assets/image/card_1/card1_att_l_96x58.png', './assets/image/card_1/card1_att_l.json');

        this.load.image('card1_l_idle', './assets/image/card_1/card1_l_idle.png');
        this.load.image('card1_l_att1', './assets/image/card_1/card1_l_att1.png');

        this.load.image('card1_r_idle', './assets/image/card_1/card1_r_idle.png');
        this.load.image('card1_r_att1', './assets/image/card_1/card1_r_att1.png');
        
    }

    create() {
        var logo = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'logo'); // 스프라이트 x,y좌표를 /2 한 이유는 그림을 그리는 기준이 이미지의 가운데 이기 때문이다. 
        // 즉 가로세로 센터로 이미지를 그릴려면 캔버스의 가운데 좌표를 지정해 줘야 그걸 기준으로 이미지를 그린다.

        var btn_login = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 1.2, 'blogin');
        btn_login.setInteractive();

        btn_login.on('pointerdown', this.onBtnLogintClicked);

        console.log("image view");
    }

    update() {

    }
    onBtnLogintClicked() {
        googleCreate();
    }

    callback(result) {
        if (result == 0) {
            console.log('FAIL : login ');
        } else {
            if (gStory == 0) {
                console.log(' start prologue ');
                game.scene.switch('LoginScene', 'PrologueScene');
            } else {
                console.log(' start main ');
                game.scene.switch('LoginScene', 'MainScene');
            }
        }
    }
}


class googlelogin {

    auth2: any;

    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '885778454275-8kva0b365qtoapotue1d1mq87i88pnor.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                ux_mode: 'redirect',
            });
            this.googleLogin();
        });
    }

    googleLogin() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.then(() => {
            googleAuth.signIn({ scope: 'profile email' }).then(googleUser => {
                let profile = googleUser.getBasicProfile();
                console.log('ID: ' + profile.getId());
                ; console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
        
                var userid = profile.getEmail().split('@');
        
                DataBaseLogin(userid[0], this.callback);
            });
        });
    }

    ngAfterViewInit() {
        this.googleInit();
    }

    callback(result) {
        if (result == 0) {
            console.log('FAIL : login ');
        } else {
            if (gStory == 0) {
                console.log(' start prologue ');
                game.scene.switch('LoginScene', 'PrologueScene');
            } else {
                console.log(' start main ');
                game.scene.switch('LoginScene', 'MainScene');
            }
        }
    }
}
