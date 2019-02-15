class cBattileItem {
    mTile: Phaser.GameObjects.Sprite;
    mUnit: Phaser.GameObjects.Sprite;

    mIsUnit: boolean;

    mPosX: number;
    mPosY: number;

    constructor() {
        this.mTile = null;
        this.mUnit = null;
        this.mIsUnit = false;
    }

    setTile(_scene, _key, _x, _y) {
        this.mTile = _scene.add.sprite(_x, _y, _key);
        this.mPosX = _x;
        this.mPosY = _y;
    }

    setTileUnitImg(_unit) {
        this.mUnit = _unit;
    }

    getTile() {
        return this.mTile;
    }

    setIsUnit(_value) {
        this.mIsUnit = _value;
    }

    isUnit() {
        return this.mIsUnit;
    }
}

class cViewFaceList {

    mCardNo: number;
    mCardImg: Phaser.GameObjects.Sprite;

    constructor() {

    }

    setCardNo(_no) {
        this.mCardNo = _no;
    }

    getCardNo() {
        return this.mCardNo;
    }

    setCardImg(_img) {
        this.mCardImg = _img;
    }

    getCardImg() {
        return this.mCardImg;
    }
}

class cUnitInfo {

    mIsUnit: boolean;
    mCardImg: Phaser.GameObjects.Sprite;

    mNo: number;
    mId: number;
    mAtt: number;
    mAtttype: number;

    mHp: number;
    mSkill: number;

    constructor() {
        this.mIsUnit = false;
    }

    isUnit() {
        return this.mIsUnit;
    }

    setIsUnit(_value) {
        this.mIsUnit = _value;
    }

    setUnitImg(_img) {
        this.mCardImg = _img;
    }

    getUnitImg() {
        return this.mCardImg;
    }

    setUnitInfo(_no, _id, _att, _atttype, _hp, _skill) {
        this.mNo = _no;
        this.mId = _id;
        this.mAtt = _att;
        this.mAtttype = _atttype;
        this.mHp = _hp;
        this.mSkill = _skill;
    }

    getUnitNo() {
        return this.mNo;
    }

    getUnitId() {
        return this.mId;
    }

    getUnitAtt() {
        return this.mAtt;
    }

    getUnitAtttype() {
        return this.mAtttype;
    }

    getUnitHp() {
        return this.mHp;
    }

    getUnitSkill() {
        return this.mSkill;
    }

    setUnitHp(_hp) {
        this.mHp = _hp;
    }
}

class cTileUnitList {

    mWidthNumber: number;
    mUnitIndex = new Array<cUnitInfo[]>(gTileWidthCont);

    constructor() {
        for (var i = 0; i < gTileWidthCont; i++) {
            this.mUnitIndex[i] = new Array<cUnitInfo>(gtitleHeght);
        }
    }

    setIndexUnit(_x, _y, _unitinfo) {
        this.mUnitIndex[_x][_y] = _unitinfo;
        this.mUnitIndex[_x][_y].setIsUnit(true);
    }

    isUnit(_x, _y) {
        if (this.mUnitIndex[_x][_y] == null) return false;
        return this.mUnitIndex[_x][_y].isUnit();
    }

    getIndexUnit(_x, _y) {
        return this.mUnitIndex[_x][_y];
    }

}

class SceneBattle extends Phaser.Scene {

    endFlag = false;
    mbtn_next: Phaser.GameObjects.Sprite;

    mMyTile = new Array<cBattileItem>();
    mEnemyTile = new Array<cBattileItem>();
    positionX: number;
    positionY: number;

    mEmPositionX: number;
    mEmPositionY: number;

    //mViewFaceList = new Array<cViewFaceList>();
    mFacePosX: number;
    mFacePosY: number;
    mFacePanding: number;

    mDeckStartIndex: number;
    mtimerFlag: Boolean;
    mtx_timer: Phaser.GameObjects.Text;
    timerEvent: Phaser.Time.TimerEvent;
    mtimerEnemyTurn: Phaser.Time.TimerEvent;
    mtimerMyAction: Phaser.Time.TimerEvent;

    mtileIndex: number;
    mSelectTiled: number;

    mTileMyUnit: cTileUnitList;
    mtileEnemyUnit: cTileUnitList;

	mTxMyHp: Phaser.GameObjects.Text;
	mTxMyDamage: Phaser.GameObjects.Text;
	mMyUnitBody: Phaser.GameObjects.Sprite;
    mMyUnitList = new Array<cUnitInfo>();
    mMyNextUnit = 0;
    mTempUnit: cUnitInfo;
    mTempUnit2: cUnitInfo;
    mTempIndex: number;

    mEnemyUnitList = new Array<cUnitInfo>();
    mEnemyNextUnit = 0;

    mTxEnemyHp: Phaser.GameObjects.Text;
    mTxEnemyDamage: Phaser.GameObjects.Text;

	mGameOver: number;

    constructor(config) {
        super({
            key: 'BattleScene',
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

        Phaser.Scene.call(this, { key: 'BattleScene' });

    }

    init(config) {
        console.log('[GAME] init');
    }

    preload(data) {
    }

    create(data) {
		console.log('create battle scene');
        this.anims.create({
            key: 'ani_card1_r_att',
            frames: this.anims.generateFrameNames('sp_card1_r_att'),
            frameRate: 3,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'ani_card1_l_att',
            frames: this.anims.generateFrameNames('sp_card1_l_att'),
            frameRate: 3,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true
        });

		this.itemInit();


		this.events.on('wake', function () {
			console.log('wake : ' + this.mGameOver);

			if (this.mGameOver == 1) {
				this.itemInit();
			}
		}, this);

		this.events.on('sleep', function () {
			console.log('sleep');
			if (this.mGameOver == 1) {
				this.timerOff();
				while (this.mEnemyUnitList.length > 0) {
					this.mEnemyUnitList.pop();
				}

				console.log('mMyTile length' + this.mMyTile.length);
				while (this.mMyTile.length > 0) {
					this.mMyTile.pop();
				}


				console.log('mEnemyTile length' + this.mEnemyTile.length);
				while (this.mEnemyTile.length > 0) {
					this.mEnemyTile.pop();
				}
			}
		}, this);
    }

	itemInit() {
		console.log('init item battle scene');
		this.positionX = 0;
		this.positionY = 0;
		gBattleViewState = 0;
		this.mDeckStartIndex = 0;
		gSelectTimer = BATTLE_VIEW_DEFAULT_SELECT_TIMER;

		this.mFacePosX = this.game.canvas.width - (this.game.canvas.width / 3);
		this.mFacePosY = this.game.canvas.height - 10; /* Panding */
		this.mFacePanding = 10;

		this.positionX = (this.game.canvas.width / 2) - 80; // 1280
		this.positionY = this.game.canvas.height / 3;

		var offsetX = this.positionX;
		var offsetY = this.positionY;
		var deltaX = 100;
		var deltaY = 100;

		this.mEmPositionX = (this.game.canvas.width / 2) + 80;
		this.mEmPositionY = this.positionY;
		var emOffsetX = this.mEmPositionX;

		gHp = gLv * 100; // test code 

		/* 배경 */
		this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'stage1_background');

		/* 버튼 */
		this.mbtn_next = this.add.sprite(this.game.canvas.width - 20, this.game.canvas.height - 20, 'ui_btn_next');
		this.mbtn_next.setOrigin(1, 1);
		this.mbtn_next.setInteractive();
		this.mbtn_next.on('pointerdown', this.onBtnNext);

		/* 타이머 */
		this.mtx_timer = this.add.text(0, 0, 'TIME : ' + gSelectTimer, gTextTimerstyle);
		this.mtx_timer.x = this.mbtn_next.x - 20;
		this.mtx_timer.y = this.mbtn_next.y - this.mbtn_next.height - 20;
		this.mtx_timer.setOrigin(1, 1);
		this.timeSet();

		/* 아군 유닛 위치 타일 */
		this.mMyUnitBody = this.add.sprite(100, this.game.canvas.height / 2, 'ui_my_character');
		this.mMyUnitBody.setDisplaySize(gUnitSizeX, gUnitSizeY);

		this.mTxMyHp = this.add.text(80, this.game.canvas.height / 2 - 100, gHp, gTextHpStyle);
		this.mTileMyUnit = new cTileUnitList();
		for (var j = 0; j < gtitleHeght; /* 3 */ j++) {
			this.positionY = offsetY + (deltaY * j);
			offsetX = offsetX - (j * 7);
			for (var i = 0; i < gTileWidthCont; /* 4 */ i++) {
				var mItem = new cBattileItem();
				this.positionX = offsetX - (deltaX * i);
				mItem.setTile(this, 'ui_tile_l', this.positionX, this.positionY);
				this.mMyTile.push(mItem);
			}
		}

		/* 적군 유닛 위치 타일 */
		this.mtileEnemyUnit = new cTileUnitList();
		for (var j = 0; j < gtitleHeght; /* 3 */ j++) {
			this.mEmPositionY = offsetY + (deltaY * j);
			emOffsetX = emOffsetX + (j * 7);
			for (var i = 0; i < gTileWidthCont; /* 4 */ i++) {
				var mItem = new cBattileItem();
				this.mEmPositionX = emOffsetX + (deltaX * i);
				mItem.setTile(this, 'ui_tile_r', this.mEmPositionX, this.mEmPositionY);
				this.mEnemyTile.push(mItem);
			}
		}

		/* 적 보스 */
		var enemy = this.add.sprite(this.game.canvas.width - 15, this.game.canvas.height / 2, 'enemy_1_1');
		enemy.setOrigin(1, 0.5);
		enemy.setDisplaySize(gUnitSizeX, gUnitSizeY);


		/* 카드 리스트 */
		while(this.mMyUnitList.length >0) {
			this.mMyUnitList.pop();
		}

		DataBaseGetCardDeckList(this.callbackDeckCardList);
		this.mGameOver = 0;
	}

    update() {
        //this.countDown(this.timerEvent);

        if (gBattleViewState == BATTLE_VIEW_GET_DECK_LIST) {
            /* 카드 리스트에서 무작위로 섞어준다 */
			if (gCardDeckList != null) {
				for (var i = 0; i < Object.keys(gCardDeckList).length; i++) {
					console.log('gCardDeckList shuffle before' + gCardDeckList[i].no);
				}

				shuffle(gCardDeckList);
				for (var i = 0; i < Object.keys(gCardDeckList).length; i++) {
					console.log('gCardDeckList shuffle after' + gCardDeckList[i].no);
				}
			}
            gBattleViewState = BATTLE_VIEW_GET_UI_ENEMY;

            this.showCardList();

        } else if (gBattleViewState == BATTLE_VIEW_GET_UI_ENEMY) {
			gBattleViewState = BATTLE_VIEW_IDLE;
			this.mTxEnemyHp = this.add.text(this.game.canvas.width - 90, this.game.canvas.height / 2 - 100, gEnemyHp, gTextHpStyle);
        } else if (gBattleViewState == BATTLE_VIEW_TIME_OVER) {
            console.log('select time over');
            this.turnSwitchUI();
            gBattleViewState = BATTLE_VIEW_MY_ACTION;
        } else if (gBattleViewState == BATTLE_VIEW_SELECT_CHAR) {
            console.log('select BATTLE_VIEW_SELECT_CHAR');
            this.turnSwitchUI();
            gBattleViewState = BATTLE_VIEW_MY_ACTION;
        } else if (gBattleViewState == BATTLE_VIEW_EMENY_TURN) {
            if (gbattleStage >= 0x10 && gbattleStage <= 0x19) {
                //Stage1Action(this);
                this.mEnemyNextUnit = 0;
                this.mtimerEnemyTurn = this.time.addEvent({ delay: 1000, callback: this.enemyTurn, callbackScope: this, repeat: 0 });
                gBattleViewState = BATTLE_VIEW_IDLE;
            }
        } else if (gBattleViewState == BATTLE_VIEW_RETURN_MY_TURN) {

            this.turnSwitchUI();
            gBattleViewState = BATTLE_VIEW_IDLE;
        } else if (gBattleViewState == BATTLE_VIEW_MY_ACTION) {
            gBattleViewState = BATTLE_VIEW_MY_ACTIONING;
            this.mtimerMyAction = this.time.addEvent({ delay: 500, callback: this.myAction, callbackScope: this, repeat: 0 });
        } else if (gBattleViewState == BATTLE_VIEW_MY_ACTIONING) {
            ;
        }
    }

    onBtnNext() {
        console.log('next btn : skip');
        gBattleViewState = BATTLE_VIEW_SELECT_CHAR;
    }

    callbackDeckCardList(_value) {
        console.log('callbackDeckCardList: callbackDeckList : ' + _value);
        if (_value == '0') {
            //error or don't have card.
            console.log('callbackDeckCardList: callbackDeckList 0');
            gCardDeckList = null;
        } else if (Object.keys(_value).length == 0) {
            console.log('callbackDeckCardList: callbackDeckList length 0');
            gCardDeckList = null;
        }
        else {
            console.log('callbackDeckCardList: gCardDeckList write');
            gCardDeckList = _value;
        }
        gBattleViewState = BATTLE_VIEW_GET_DECK_LIST;
    }

    showCardList() {
		var mCard_len = 0;
		if (gCardDeckList != null) {
			mCard_len = Object.keys(gCardDeckList).length;
		}
        var mEnemyCard_len = Object.keys(gEnemyCardList).length;
        gCurrentViewLen = 0;

		for (var i = 0; i < mCard_len; i++) {
            var mmUnitInfo = new cUnitInfo();
            mmUnitInfo.setUnitInfo(gCardDeckList[i].no, gCardDeckList[i].cardid, gCardDeckList[i].cardatt, gCardDeckList[i].cardatttype, gCardDeckList[i].cardhp, gCardDeckList[i].cardskill);
            this.mMyUnitList.push(mmUnitInfo);
        }

		for (var i = 0; i < mEnemyCard_len; i++) {
            var mmUnitInfo = new cUnitInfo();
            mmUnitInfo.setUnitInfo(gEnemyCardList[i].cardno, gEnemyCardList[i].cardid, gEnemyCardList[i].cardatt, gEnemyCardList[i].cardatttype, gEnemyCardList[i].cardhp, gEnemyCardList[i].cardskill);
            this.mEnemyUnitList.push(mmUnitInfo);
        }
        
        this.showCardList_View();
    }

    showCardList_View() {
        var mfaceImg;
        var mCardLen = this.mMyUnitList.length;
        //gCurrentViewLen

        /* 위치 초기화 다시 그린다 */
        this.mFacePosX = this.game.canvas.width - (this.game.canvas.width / 3);
        this.mFacePosY = this.game.canvas.height - 10; /* Panding */
        this.mFacePanding = 10;

        for (var i = 0; i < this.mMyUnitList.length; i++) {
            if (this.mMyUnitList[i].getUnitImg() != null) {
                this.mMyUnitList[i].getUnitImg().destroy();
            }
        }

        while (mCardLen != 0 && gCurrentViewLen != 4) {
            if (mCardLen == gCurrentViewLen) break;

            var mCardInfo = this.mMyUnitList[gCurrentViewLen];

            switch (mCardInfo.getUnitId()) {
                case 1:
                //break;
                default:
                    mfaceImg = this.add.sprite(this.mFacePosX, this.mFacePosY, 'cd1_face');
                    this.mFacePosY = this.game.canvas.height - mfaceImg.height;
                    mfaceImg.y = this.mFacePosY;
                    mfaceImg.setInteractive();
					mfaceImg.setDisplaySize(gUnitFaceSizeX, gUnitFaceSizeY);
                    mfaceImg.setName(mCardInfo.getUnitId());

                    this.mMyUnitList[gCurrentViewLen].setUnitImg(mfaceImg);
                    break;
            }
			gCurrentViewLen++;
			this.mFacePosX = this.mFacePosX - mfaceImg.width - this.mFacePanding; /* Face Size */

            this.input.setDraggable(mfaceImg);

            this.input.on('dragstart', function (pointer, gameObject) {
                gisSetCharacter = 0;
                this.mSelectTiled = -1;
                gTempObjectX = gameObject.x;
                gTempObjectY = gameObject.y;

                console.log('object Card ID:' + gameObject.name);
                switch (gameObject.name) {
                    case 1:
                    //break;
                    default:
                        gameObject.setTexture('card1_l_idle');
						gameObject.setDisplaySize(gUnitSizeX, gUnitSizeY);
                        break;
                }
            }, this);

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;

                this.mtileIndex = this.checkCollision(gameObject);
                if (this.mtileIndex != -1) {
                    if (this.mtileIndex != this.mSelectTiled) {
                        if (this.mSelectTiled != -1) {
							this.mMyTile[this.mSelectTiled].getTile().clearTint();
                        }
						this.mMyTile[this.mtileIndex].getTile().setTint(0xff0000);
                        this.mSelectTiled = this.mtileIndex;
                    }
                } else {
                    if (this.mSelectTiled != -1) {
						this.mMyTile[this.mSelectTiled].getTile().clearTint();
                        this.mSelectTiled = -1;
                    }
                }
            }, this);

            this.input.on('dragend', function (pointer, gameObject) {
                if (gisSetCharacter == 1) {
                    this.input.disable(gameObject);

					gameObject.x = this.mMyTile[this.mtileIndex].getTile().x;
					gameObject.y = this.mMyTile[this.mtileIndex].getTile().y - 20;

					this.mMyTile[this.mtileIndex].setIsUnit(true);
                    for (var i = 0; i < this.mMyUnitList.length; i++) {
                        if (this.mMyUnitList[i].getUnitId() == gameObject.name) {
                            //cTileUnitList
                            var mmX = this.mtileIndex % gTileWidthCont;
                            var mmY = Math.floor(this.mtileIndex / gTileWidthCont); /* 4 */
                            console.log('select X:' + mmX + ' Y: ' + mmY);
                            this.mTileMyUnit.setIndexUnit(mmX, mmY, this.mMyUnitList[i]);
                            this.mMyUnitList.splice(i, 1);
                            break;
                        }
                    }
                    
                    gBattleViewState = BATTLE_VIEW_SELECT_CHAR;
                } else {
                    gameObject.x = gTempObjectX;
                    gameObject.y = gTempObjectY;
                    console.log('dragend object Card ID:' + gameObject.name);
                    switch (gameObject.name) {
                        case 1:
                        // break;
                        default:
                            gameObject.setTexture('cd1_face');
                            gameObject.setDisplaySize(gameObject.width / 2, gameObject.height / 2);
                            break;
                    }
                }
            }, this);
        }
        gCurrentViewLen = 0;
    }

    countDown() {
        console.log(new Date().toLocaleString());
        if (this.mtimerFlag == true) {
            return;
        }
        gSelectTimer--;
        if (gSelectTimer < 0) {
            this.mtx_timer.setText('TIME : ' + 0);
        } else {
            this.mtx_timer.setText('TIME : ' + gSelectTimer);
        }
        
        if (gSelectTimer<=0) {
            gBattleViewState = BATTLE_VIEW_TIME_OVER;
        }
    }

    timeSet() {
        gSelectTimer = 10;
        this.mtimerFlag = false;
        this.mtx_timer.setText('TIME : ' + gSelectTimer );
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.countDown, callbackScope: this, repeat: 9 });
    }

    timerOff() {
        //timerEvent
        this.mtimerFlag = true;
        this.timerEvent.remove(this.countDown);
        //gSelectTimer = 0;
        this.mtx_timer.setText('TIME : ' + 0);
    }

    checkCollision(_gameObject) {
        //this.mlist
        var mDist;
        var mNear = 100;
        var mmTileIndex = -1;
		for (var i = 0; i < this.mMyTile.length; i++) {
			if (this.mMyTile[i].isUnit() != true) {
				mDist = dist(_gameObject.x, _gameObject.y, this.mMyTile[i].getTile().x, this.mMyTile[i].getTile().y);
                if (mNear > mDist) {
                    mNear = mDist;
                    mmTileIndex = i;
                }
            }
        }
        console.log('Near : ' + mNear);
        if (mNear >= 100) {
            gisSetCharacter = 0;
        } else {
            gisSetCharacter = 1;
        }
        return mmTileIndex;
    }

    turnSwitchUI() {
        var i = 0;
        if (gBattleViewState == BATTLE_VIEW_TIME_OVER || gBattleViewState == BATTLE_VIEW_SELECT_CHAR) {
            this.showCardList_View();
            for (i = 0; i < this.mMyUnitList.length; i++) {
                var img = this.mMyUnitList[i].getUnitImg();
                if (img != null) {
                    this.input.disable(img);
                }
            }

            this.input.disable(this.mbtn_next);

            this.timerOff();
            this.mMyNextUnit = 0;
        } else if (gBattleViewState == BATTLE_VIEW_RETURN_MY_TURN) {
            this.timeSet();

            for (i = 0; i < this.mMyUnitList.length; i++) {
                var img = this.mMyUnitList[i].getUnitImg();
                if (img != null) {
                    this.input.enable(img);
                }
            }

            this.input.enable(this.mbtn_next);
        }
    }

    enemyTurn() {
        var isFlag = false;
        var isSetUnit = false;
        var randomCount = 0;
        var postionX = 0;
        var postionY = 9;
        var mm;

        console.log('this.mEnemyUnitList.length : ' + this.mEnemyUnitList.length);
        if (this.mEnemyUnitList.length == 0) {
            this.enemyAction();
            return;
        }

        var mmX = Math.floor(Math.random() * 4);
        var mmY = Math.floor(Math.random() * 3);

        console.log('enemy select postion X:' + mmX + ' Y: ' + mmY);
        do {
            if (this.mtileEnemyUnit.isUnit(mmX, mmY)) {
                if (mmX >= 3) {
                    if (mmY >= 2) {
                        mmX - 1;
                        isFlag = true;
                    } else {
                        mmY + 1;
                    }
                } else {
                    if (isFlag) {
                        isFlag = false;
                        if (mmY >= 1) {
                            mmY - 1;
                        } else {
                            mmY = 0;
                        }
                    } else {
                        mmX + 1;
                    }
                }
                randomCount++;
            } else {
                mm = this.mEnemyUnitList.pop();
                this.mtileEnemyUnit.setIndexUnit(mmX, mmY, mm);
                postionX = mmX;
                postionY = mmY;
                isSetUnit = true;
            }

        } while (isSetUnit != true && randomCount != 5)

        if (isSetUnit != true || randomCount >= 5) {
            // All Select Tile
            console.log('enemyTurn isSet? : ' + isSetUnit + ' randomCont:' + randomCount);
            for (var j = 0; j < gTileWidthCont; j++) {
                for (var k = 0; k < gtitleHeght; k++) {
                    if (this.mtileEnemyUnit.isUnit(j, k)) {
                        ;
                    } else {
                        mm = this.mEnemyUnitList.pop();
                        this.mtileEnemyUnit.setIndexUnit(j, k, mm);
                        isSetUnit = true;
                        postionX = j;
                        postionY = k;
                        break;
                    }
                }
                if (isSetUnit == true) {
                    break;
                }
            }
        }

        if (isSetUnit != true) {
            console.log('enemy unit full');
        } else {
            // load enemy unit
            //postionX * postionY;
            var index = postionX + (postionY * 4);
                
			this.mEnemyTile[index].setIsUnit(true);
            
			var imgpostionX = this.mEnemyTile[index].getTile().x;
			var imgpostionY = this.mEnemyTile[index].getTile().y - 20;

            switch (mm.getUnitId()) {
                case 1:
                    //break;
                default:
                    console.log('set enemy unit img');
                    var enemyImg = this.add.sprite(imgpostionX, imgpostionY, 'card1_r_idle');
					enemyImg.setDisplaySize(gUnitSizeX, gUnitSizeY);
                    //setTileUnitImg
                    this.mtileEnemyUnit.getIndexUnit(postionX, postionY).setUnitImg(enemyImg);
                    break;
            }
        }
        this.enemyAction();
    }

    myAction() {
        var mtileLen = gtitleHeght * gTileWidthCont;
        var mmX;
        var mmY;
        var misFoundMyUnit = false;
        var misFoundEnemy = false;
        var mEnemyX = 0;
        var mEnemyY = 0;

        for (var i = this.mMyNextUnit; i < mtileLen; i++) {
            mmX = i % gTileWidthCont;
            mmY = Math.floor(i / gTileWidthCont); /* 4 */

            console.log('myUnit : x:' + mmX + ' y:' + mmY);
            if (this.mTileMyUnit.isUnit(mmX, mmY) == true) {
                console.log('is True : x:' + mmX + ' y:' + mmY);
                misFoundMyUnit = true;
                for (var j = 0; j < gTileWidthCont; j++) {
                    if (this.mtileEnemyUnit.isUnit(j, mmY) == true) {
                        misFoundEnemy = true;
                        mEnemyX = j;
                        mEnemyY = mmY;
                        break;
                    }
                }
                this.mMyNextUnit = i + 1;

                /* 내 유닛 라인에 적 유닛이 있었나? */
                if (misFoundEnemy == true) {
                    this.attEnemyUnit(mmX, mmY, mEnemyX, mEnemyY);
                    break;
                } else {
                    /* 내 유닛 라인에 적 유닛이 없다 */
                    this.attBoss(mmX, mmY);
                    break;
                }
            }
        }
        if (misFoundMyUnit == false) {
            gBattleViewState = BATTLE_VIEW_EMENY_TURN;
        }

    }

    enemyAction() {
        var mtileLen = gtitleHeght * gTileWidthCont;
        var mmX;
        var mmY;
        var misFoundEnemyUnit = false;
        var misFoundMyUnit = false;
        var mMyX = 0;
        var mMyY = 0;

        for (var i = this.mEnemyNextUnit; i < mtileLen; i++) {
            mmX = i % gTileWidthCont;
            mmY = Math.floor(i / gTileWidthCont); /* 4 */

            console.log('EnemyUnit : x:' + mmX + ' y:' + mmY);
            if (this.mtileEnemyUnit.isUnit(mmX, mmY) == true) {
                console.log('is True : x:' + mmX + ' y:' + mmY);
                misFoundEnemyUnit = true;
                for (var j = 0; j < gTileWidthCont; j++) {
                    if (this.mTileMyUnit.isUnit(j, mmY) == true) {
                        misFoundMyUnit = true;
                        mMyX = j;
                        mMyY = mmY;
                        break;
                    }
                }
                this.mEnemyNextUnit = i + 1;

                /* 적 유닛 라인에 내 유닛이 있었나? */
                if (misFoundMyUnit == true) {
                    this.attMyUnit(mmX, mmY, mMyX, mMyY);
                    break;
                } else {
                    /* 적 유닛 라인에 내 유닛이 없다 */
                    this.attMyBoss(mmX, mmY);
                    break;
                }
            }
        }
        if (misFoundEnemyUnit == false) {
            gBattleViewState = BATTLE_VIEW_RETURN_MY_TURN;
        }
    }

    checkEnemyUnit() {
        //mtileEnemyUnit
    }

    attBoss(_x, _y) {
        this.mTempUnit = this.mTileMyUnit.getIndexUnit(_x, _y);

        if (this.mTempUnit.isUnit() != true) {
            // 이쪽 코드를 타면 먼가 버그가 있다.
            console.log('attBoss: x:' + _x + ' y:' + _y);
            return;
        }
        var cardId = this.mTempUnit.getUnitId();
        switch (cardId) {
            case 1:
                //break;
            default:
                console.log('ani run');
                
                this.mTempUnit.getUnitImg().setVisible(false);
                
				var ani = this.add.sprite(this.game.canvas.width - 100, this.game.canvas.height / 2, 'sp_card1_l_att');
				ani.setSize(gUnitSizeX, gUnitSizeY);
                ani.once('animationcomplete', this.animComplete, this);
                ani.play('ani_card1_l_att');
                break;
        }
    }

    attEnemyUnit(_myX, _myY, _enX, _enY) {
        this.mTempUnit = this.mTileMyUnit.getIndexUnit(_myX, _myY);
        this.mTempUnit2 = this.mtileEnemyUnit.getIndexUnit(_enX, _enY);

        this.mTempIndex = _enX + (_enY * 4);

        var cardId = this.mTempUnit.getUnitId();
        switch (cardId) {
            case 1:
            //break;
            default:
                console.log('ani run');

                this.mTempUnit.getUnitImg().setVisible(false);

				var ani = this.add.sprite(this.mTempUnit2.getUnitImg().x - 20, this.mTempUnit2.getUnitImg().y, 'sp_card1_l_att');
				ani.setSize(gUnitSizeX, gUnitSizeY);
                ani.once('animationcomplete', this.attEnemyUnitAnimComplete, this);
                ani.play('ani_card1_l_att');
                break;
        }
    }

    animComplete() {
        var mmDamage = this.mTempUnit.getUnitAtt();
        this.mTempUnit.getUnitImg().setVisible(true);
        gEnemyHp = +gEnemyHp - mmDamage;
        this.mTxEnemyHp.setText('' + gEnemyHp);
		this.mTxEnemyDamage = this.add.text(this.mTxEnemyHp.x, this.mTxEnemyHp.y, '- ' + mmDamage, gTextHpStyle);

        this.tweens.add({
            targets: this.mTxEnemyDamage,
            y: this.mTxEnemyDamage.y - 100,
            duration: 1500,
            alpha: 0
		});

		if (gEnemyHp <= 0) {
			this.gameVictory();
		} else {
			this.myAction();
		}
    }

    attEnemyUnitAnimComplete() {
        var mmDamage = this.mTempUnit.getUnitAtt();
        this.mTempUnit.getUnitImg().setVisible(true);

        var enHp = this.mTempUnit2.getUnitHp();
        enHp = +enHp - mmDamage;

        if (enHp <= 0) {
            // Enemy die
            this.mTempUnit2.getUnitImg().setVisible(false);
            this.mTempUnit2.setIsUnit(false);

			this.mEnemyTile[this.mTempIndex].getTile().clearTint();
			this.mEnemyTile[this.mTempIndex].setIsUnit(false);

        } else {
            this.mTempUnit2.setUnitHp(enHp);
        }
        this.myAction();
    }

    attMyBoss(_x, _y) {
        this.mTempUnit = this.mtileEnemyUnit.getIndexUnit(_x, _y);

        if (this.mTempUnit.isUnit() != true) {
            // 이쪽 코드를 타면 먼가 버그가 있다.
            console.log('attMyBoss: x:' + _x + ' y:' + _y);
            return;
        }
        var cardId = this.mTempUnit.getUnitId();
        switch (cardId) {
            case 1:
            //break;
            default:
                console.log('ani run');

                this.mTempUnit.getUnitImg().setVisible(false);

				var ani = this.add.sprite(this.mMyUnitBody.x + 20, this.mMyUnitBody.y, 'sp_card1_r_att');
				ani.setSize(gUnitSizeX, gUnitSizeY);
                ani.once('animationcomplete', this.myBossAttAnimComplete, this);
                ani.play('ani_card1_r_att');
                break;
        }

    }

    attMyUnit(_enX, _enY, _myX, _myY) {
        this.mTempUnit = this.mtileEnemyUnit.getIndexUnit(_enX, _enY);
        this.mTempUnit2 = this.mTileMyUnit.getIndexUnit(_myX, _myY);
        this.mTempIndex = _myX + (_myY * 4);
        var cardId = this.mTempUnit.getUnitId();

        switch (cardId) {
            case 1:
            //break;
            default:
                console.log('ani run');

                this.mTempUnit.getUnitImg().setVisible(false);

				var ani = this.add.sprite(this.mTempUnit2.getUnitImg().x + 20, this.mTempUnit2.getUnitImg().y, 'sp_card1_r_att');
				ani.setSize(gUnitSizeX, gUnitSizeY);
                ani.once('animationcomplete', this.attMyUnitAnimComplete, this);
                ani.play('ani_card1_r_att');
                break;
        }
    }

    myBossAttAnimComplete() {
        var mmDamage = this.mTempUnit.getUnitAtt();
        this.mTempUnit.getUnitImg().setVisible(true);

        
        gHp = +gHp - mmDamage;

		this.mTxMyHp.setText('' + gHp);
		this.mTxMyDamage = this.add.text(this.mTxMyHp.x, this.mTxMyHp.y, '- ' + mmDamage, gTextHpStyle);

        this.tweens.add({
            targets: this.mTxMyDamage,
            y: this.mTxMyDamage.y - 100,
            duration: 1500,
            alpha: 0
        });

        if (gHp <= 0) {
            this.gameOver();
        } else {
            this.enemyAction();
        }
    }

    attMyUnitAnimComplete() {
        var mmDamage = this.mTempUnit.getUnitAtt();
        this.mTempUnit.getUnitImg().setVisible(true);

        var enHp = this.mTempUnit2.getUnitHp();
        enHp = +enHp - mmDamage;

        if (enHp <= 0) {
            // My Unit die
            this.mTempUnit2.getUnitImg().setVisible(false);
            this.mTempUnit2.setIsUnit(false);

			this.mMyTile[this.mTempIndex].getTile().clearTint();
			this.mMyTile[this.mTempIndex].setIsUnit(false);

        } else {
            this.mTempUnit2.setUnitHp(enHp);
        }
        this.enemyAction();
    }

    gameOver() {
		gBattleViewState = BATTLE_VIEW_GAME_OVER;
        console.log(' Game Over');
		this.mGameOver = 1;
		game.scene.switch('BattleScene', 'ResultScene');
	}

	gameVictory() {
		gBattleViewState = BATTLE_VIEW_GAME_VICTORY;
		console.log(' Game Victory');
		this.mGameOver = 1;
		game.scene.switch('BattleScene', 'ResultScene');		
	}

}
