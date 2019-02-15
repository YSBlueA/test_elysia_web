
function Stage1Create(_scene) {
    //
    _scene.load.image('stage1_1_enemy', './assets/image/ui_st1_1_enemy.png');
    _scene.load.image('stage1_2_enemy', './assets/image/ui_st1_2_enemy.png');
    _scene.load.image('stage1_3_enemy', './assets/image/ui_st1_3_enemy.png');
    _scene.load.image('stage1_4_enemy', './assets/image/ui_st1_4_enemy.png');
    _scene.load.image('stage1_5_enemy', './assets/image/ui_st1_5_enemy.png');
}

function Stage1Sprite(_scene) {

    var tex = _scene.textures.get('stage1_1_enemy');
    var mEnemy = tex.getSourceImage();
    var position = mEnemy.width + mEnemy.width / 2;
    var interval = (mEnemy.width / 2) * 3;

    var img_sub1 = _scene.add.sprite(position, _scene.game.canvas.height - mEnemy.height, 'stage1_1_enemy');
    position += interval;
    var img_sub2 = _scene.add.sprite(position, _scene.game.canvas.height - mEnemy.height, 'stage1_2_enemy');
    position += interval;
    var img_sub3 = _scene.add.sprite(position, _scene.game.canvas.height - mEnemy.height, 'stage1_3_enemy');
    position += interval;
    var img_sub4 = _scene.add.sprite(position, _scene.game.canvas.height - mEnemy.height, 'stage1_4_enemy');
    position += interval;
    var img_sub5 = _scene.add.sprite(position, _scene.game.canvas.height - mEnemy.height, 'stage1_5_enemy');

    img_sub1.setInteractive();
    img_sub2.setInteractive();
    img_sub3.setInteractive();
    img_sub4.setInteractive();
    img_sub5.setInteractive();

    img_sub1.on('pointerdown', function onClickedSub1() {
        console.log('sub1 start');
        gbattleStage = 0x11;
        getStage1_1EnemyInfo();
        game.scene.switch('StoryScene', 'BattleScene');
        
    });
    img_sub2.on('pointerdown', function onClickedSub2() {
        console.log('sub2 start');
    });

}

function Stage1Action(_scene) {
    //gbattleStage
    switch (gbattleStage) {
        case 0x11:
            gBattleViewState = BATTLE_VIEW_RETURN_MY_TURN;
            break;
        default:
            break;
    }
}

function getStage1_1EnemyInfo() {
    switch (gbattleStage) {
        case 0x11:
            DataBaseGetEnemyInfo(callbackStage, gbattleStage);
            break;
        default:
            break;
    }
}

function callbackStage(_value) {
    console.log('callbackStage');
    console.log('value : ' + _value);

    gEnemyHp = _value[0].hp;

    _value.splice(0, 1); // 첫 배열은 보스의 정보이다.
    gEnemyCardList = _value;

    shuffle(gEnemyCardList);
}

function setEnemyUnitCard() {

}