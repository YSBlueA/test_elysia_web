class SceneDeckCard extends Phaser.Scene {

    LlistCard: LlistView;
    LlistDeckCard: LlistView;

	mTx_Card_Page_Count: Phaser.GameObjects.Text;
	mTx_Deck_Page_Count: Phaser.GameObjects.Text;

	mCurrentPage: number;
	mDeckCurrentPage: number;

    tx_cost_value: Phaser.GameObjects.Text;
	style_tx: object;

	mViewCardImage: Phaser.GameObjects.Sprite;

    constructor(config) {
        super({
            key: 'DeckCardScene',
            physics: {
                system: 'impact',
                gravity: 100
            }
        });
        console.log(config);

        Phaser.Scene.call(this, { key: 'DeckCardScene' });

    }

    init() {
        console.log('[GAME] init');
    }

    preload() {

    }

    create() {
		gCardDeckCurrentCost = 0;

        gCardDeckViewState = CARD_DECK_VIEW_IDLE;

        DataBaseGetCardList(this.callback);

        this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'deck_background');

        var backKey = this.add.sprite(32, 32, 'Sceneback');
        backKey.setInteractive();

        backKey.on('pointerdown', this.onBackKeyClicked);

        gCardUpdated = false;

        this.style_tx = { fontFamily: 'Arial', fontSize: '24px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };

        var tx_lv_title = this.add.text(32, 32, 'LV : ', this.style_tx);
        tx_lv_title.x = this.game.canvas.width / 3;
        tx_lv_title.y = 100;

        var tx_lv_value = this.add.text(32, 32, gLv, this.style_tx);
        tx_lv_value.x = tx_lv_title.x + tx_lv_title.width;
        tx_lv_value.y = tx_lv_title.y;

        var tx_cost_title = this.add.text(32, 32, 'COST : ', this.style_tx);
        tx_cost_title.x = this.game.canvas.width / 1.5;
		tx_cost_title.y = tx_lv_title.y;

        this.tx_cost_value = this.add.text(32, 32, gCardDeckCurrentCost + '/' + gCost, this.style_tx);
        this.tx_cost_value.x = tx_cost_title.x + tx_cost_title.width;
        this.tx_cost_value.y = tx_cost_title.y;

		this.mTx_Card_Page_Count = this.add.text(0, 0, '( 0 / 0 )', this.style_tx);
		this.mTx_Card_Page_Count.x = tx_lv_title.x + 100;
		this.mTx_Card_Page_Count.y = tx_lv_title.y + 50;

		this.mTx_Deck_Page_Count = this.add.text(0, 0, '( 0 / 0 )', this.style_tx);
		this.mTx_Deck_Page_Count.x = tx_cost_title.x + 100;
		this.mTx_Deck_Page_Count.y = tx_cost_title.y + 50;

		this.mViewCardImage = this.add.sprite(225, (this.game.canvas.height / 2) + 30, 'ui_char_body');

        /* Course */
        var mCourseUp = this.add.sprite(0, 0, 'ui_course_up');
        var mCourseDown = this.add.sprite(0, 0, 'ui_course_down');
        var mCourseRight = this.add.sprite(0, 0, 'ui_course_right');
        var mCourseLeft = this.add.sprite(0, 0, 'ui_course_left');

        var mCoursePositionX = this.game.canvas.width / 2 + 100;
        var mCoursePositionY = (this.game.canvas.height / 2) - mCourseUp.height;

        var mCoursePositionDeltaX = mCourseUp.width;
        var mCoursePositionDeltaY = mCourseUp.height + mCourseUp.height / 3;

        mCourseUp.x = mCoursePositionX;
        mCourseUp.y = mCoursePositionY;

        mCoursePositionY = mCoursePositionY + mCoursePositionDeltaY + mCourseUp.height / 2;

        mCourseRight.x = mCoursePositionX;
        mCourseRight.y = mCoursePositionY;

        mCoursePositionY = mCoursePositionY + mCoursePositionDeltaY;

        mCourseLeft.x = mCoursePositionX;
        mCourseLeft.y = mCoursePositionY;

        mCoursePositionY = mCoursePositionY + mCoursePositionDeltaY + mCourseUp.height / 2;

        mCourseDown.x = mCoursePositionX;
        mCourseDown.y = mCoursePositionY;

        mCourseUp.setInteractive();
        mCourseDown.setInteractive();
        mCourseRight.setInteractive();
        mCourseLeft.setInteractive();

        mCourseUp.on('pointerdown', this.onClickedCardListUp, this);
        mCourseDown.on('pointerdown', this.onClickedCardListDown, this);
        mCourseRight.on('pointerdown', this.onClickedCardListRight, this);
        mCourseLeft.on('pointerdown', this.onClickedCardListLeft, this);

        /* Right Deck Course */
        var mRightCourseUp = this.add.sprite(0, 0, 'ui_course_up');
        var mRightCourseDown = this.add.sprite(0, 0, 'ui_course_down');

        mRightCourseUp.x = this.game.canvas.width - mRightCourseUp.width * 2;
        mRightCourseUp.y = (this.game.canvas.height / 2) - mCourseUp.height + (mCourseUp.height / 2);

        mRightCourseDown.x = mRightCourseUp.x;
        mRightCourseDown.y = mRightCourseUp.y + mCourseUp.height * 2;

        mRightCourseUp.setInteractive();
        mRightCourseDown.setInteractive();

        mRightCourseUp.on('pointerdown', this.onClickedCardDeckUp, this);
        mRightCourseDown.on('pointerdown', this.onClickedCardDeckDown, this);

        this.LlistCard = new LlistView(this, 250, this.game.canvas.height / 4, this.game.canvas.width / 2, this.game.canvas.height);
        this.LlistDeckCard = new LlistView(this, (this.game.canvas.width / 2.5) + 150, this.game.canvas.height / 4, this.game.canvas.width, this.game.canvas.height);

        this.LlistCard.setDeckImageCallBack(this.callbackImgSelect);
        this.LlistDeckCard.setDeckImageCallBack(this.callbackImgSelect);

        gStartIndex = 0;
        gDeckStartIndex = 0;
        gCardDeckSelectImgIndex = 0;
        gCardListMaxLen = 0;
		this.mCurrentPage = 1;
		this.mDeckCurrentPage = 1;

        this.events.on('wake', function () {
			console.log('wake');
			gCardDeckViewState = CARD_DECK_VIEW_RESTART;
            gCardUpdated = true;
        });

        this.events.on('sleep', function () {
            console.log('sleep');
            gCardUpdated = true;
        });
    }

	update() {
		if (gCardUpdated) {
			this.LlistCard.clear();
			this.LlistDeckCard.clear();

			gCardListMaxLen = Object.keys(gCardList).length;
			console.log('update card');
			console.log('update card: ' + gCardListMaxLen);
			if (gCardListMaxLen > 0) {
				for (var i = 0; i < gViewMaxLen; i++) {
					if ((i + gStartIndex) < gCardListMaxLen) {
						console.log('DEBUG] no : ' + gCardList[i + gStartIndex].no);
						console.log('DEBUG] cardid : ' + gCardList[i + gStartIndex].cardid);
						console.log('DEBUG] cardlv : ' + gCardList[i + gStartIndex].cardlv);
						console.log('DEBUG] cardcost : ' + gCardList[i + gStartIndex].cardcost);
						console.log('DEBUG] cardexp : ' + gCardList[i + gStartIndex].cardexp);

						this.loadCardImage(gCardList[i + gStartIndex].no, gCardList[i + gStartIndex].cardid, gCardList[i + gStartIndex].cardlv, gCardList[i + gStartIndex].cardcost);
					} else {

					}
				}
			}

			var mMaxPage = (gCardListMaxLen % 3);
			if (mMaxPage != 0) {
				mMaxPage = Math.floor((gCardListMaxLen / 3) + 1);
			} else {
				mMaxPage = Math.floor(gCardListMaxLen / 3);
			}

			this.mTx_Card_Page_Count.setText('( ' + this.mCurrentPage + ' / ' + mMaxPage + ' )');

			if (gCardDeckList != null) {
				gCardDeckListMaxLen = Object.keys(gCardDeckList).length;
				console.log('update card');
				console.log('update card: ' + gCardDeckListMaxLen);

				//gCardDeckCurrentCost
				gCardDeckCurrentCost = 0;
				for (var i = 0; i < gCardDeckListMaxLen; i++) {
					console.log('card no : ' + gCardDeckList[i].no);
					console.log('card cost : ' + gCardDeckList[i].cardcost);
					gCardDeckCurrentCost = + gCardDeckCurrentCost + parseInt(gCardDeckList[i].cardcost);
				}

				this.tx_cost_value.setText(gCardDeckCurrentCost + '/' + gCost);

				if (gCardDeckListMaxLen > 0) {
					for (var i = 0; i < gViewMaxLen; i++) {
						if ((i + gDeckStartIndex) < gCardDeckListMaxLen) {
							console.log('no : ' + gCardDeckList[i + gDeckStartIndex].no);
							console.log('cardid : ' + gCardDeckList[i + gDeckStartIndex].cardid);
							this.loadDeckCardImage(gCardDeckList[i + gDeckStartIndex].no, gCardDeckList[i + gDeckStartIndex].cardid, gCardDeckList[i + gDeckStartIndex].cardlv, gCardDeckList[i + gDeckStartIndex].cardcost);
						}
					}
				}

				mMaxPage = (gCardDeckListMaxLen % 3);
				if (mMaxPage != 0) {
					mMaxPage = Math.floor((gCardDeckListMaxLen / 3) + 1);
				} else {
					mMaxPage = Math.floor(gCardDeckListMaxLen / 3);
				}
				this.mTx_Deck_Page_Count.setText('( ' + this.mDeckCurrentPage + ' / ' + mMaxPage + ' )');
			}

			gCardUpdated = false;
		}
		if (gCardDeckViewState == CARD_DECK_VIEW_GET_CARD_LIST) {
			gCardDeckViewState = CARD_DECK_VIEW_GET_CARD_LIST_ING;
			DataBaseGetCardDeckList(this.callbackDeckList);
		}
		if (gCardDeckViewState == CARD_DECK_VIEW_CLICK_RIGHT_BTN) {
			var cost = this.LlistCard.getIndexCost(gCardDeckSelectImgIndex);
			console.log('index cost: ' + cost + ' cur cost : ' + gCardDeckCurrentCost + ' maxCost:' + gCost);
			console.log('cost+cur : ' + (+cost + gCardDeckCurrentCost));
			if ((+cost + gCardDeckCurrentCost) > gCost) {
				alert('최대 COST를 넘었습니다.');
			} else {
				var no = this.LlistCard.getIndexNo(gCardDeckSelectImgIndex);
				console.log('Card No : ' + no);
				DataBaseSetDeckCard(this.callbackSetDeckCard, no);
			}
			gCardDeckViewState = CARD_DECK_VIEW_IDLE;
		}

		if (gCardDeckViewState == CARD_DECK_VIEW_CLICK_LEFT_BTN) {
			gCardDeckViewState = CARD_DECK_VIEW_IDLE;

			var no = this.LlistCard.getIndexNo(gCardDeckSelectImgIndex);
			console.log('Card No : ' + no);
			DataBaseDelDeckCard(this.callbackDelDeckCard, no);
		}

		if (gCardDeckViewState == CARD_DECK_VIEW_RESTART) {
			gCardDeckViewState = CARD_DECK_VIEW_IDLE;
			DataBaseGetCardList(this.callback);
		}

		if (gCardDeckViewState == CARD_DECK_VIEW_CLICK_CHAR) {
			gCardDeckViewState = CARD_DECK_VIEW_IDLE;
			var no = 0;
			if (gCardDeckSelectImgIndex > 3 && gCardDeckSelectImgIndex < 7) {
				no = this.LlistDeckCard.getIndexNo(gCardDeckSelectImgIndex);
			} else {
				no = this.LlistCard.getIndexNo(gCardDeckSelectImgIndex);
			}
			switch (no) {
				case 1:
//					break;
				default:
					this.mViewCardImage.setTexture('card1_body');
					break;
			}

		}
    }

    callbackDeckList(_value) {
        console.log('sccenedeckcard: callbackDeckList : ' + _value);
        if (_value == '0') {
            //error or don't have card.
            console.log('sccenedeckcard: callbackDeckList 0');
            gCardDeckList = null;
        } else if (Object.keys(_value).length == 0) {
            console.log('sccenedeckcard: callbackDeckList length 0');
            gCardDeckList = null;
        }
        else {
            console.log('sccenedeckcard: gCardDeckList write');
            gCardDeckList = _value;
        }
        gCardUpdated = true;
        gCardDeckViewState = CARD_DECK_VIEW_GET_CARDDECK_LIST;
    }

    callbackSetDeckCard(_value) {
        console.log('callbackSetDeckCard: ' + _value);
        // -2 : 동일한 카드가 등록되어 있음
        // -6 : 같은 종류의 카드가 등록되어 있음.
        if (_value < 0) {
            if (_value == -2) {
                alert('동일한 카드가 등록되어 있습니다.');
            } else if (_value == -6) {
                alert('같은 종류의 카드가 등록되어 있습니다.');
            } else {
                alert('기타오류 : ' + _value);
            }
        } else {
            gCardDeckViewState = CARD_DECK_VIEW_RESTART;
        }
    }

    callbackDelDeckCard(_value) {
        console.log('callbackSetDeckCard: ' + _value);
        if (_value < 0) {
            console.log('기타오류 : ' + _value);
        } else {
            gCardDeckViewState = CARD_DECK_VIEW_RESTART;
        }
    }

    callback(_value) {
        console.log('sccenedeckcard: callback :' + _value);
        if (_value == '0') {
            //error or don't have card.
            console.log('sccenedeckcard: callback 0');
            gCardList = null;
        } else if (Object.keys(_value).length == 0) {
            console.log('sccenedeckcard: callback length 0');
            gCardList = null;
        }
        else {
            console.log('sccenedeckcard: gCardList write');
            gCardList = _value;
            gCardDeckViewState = CARD_DECK_VIEW_GET_CARD_LIST;
        }
    }

    onBackKeyClicked() {
        console.log(' start Back Scene ');
        game.scene.switch('DeckCardScene', 'MainScene');
    }


    loadCardImage(_cardno, _cardid, _cardlv, _cardcost) {
        switch (_cardid) {
            case 1:
                //break;
            case 2:
                //break;
            default:
                this.LlistCard.addView('card1_list', _cardno, _cardlv, _cardcost);
                break;

        }
    }
    loadDeckCardImage(_cardno, _cardid, _cardlv, _cardcost) {
        switch (_cardid) {
            case 1:
            //break;
            case 2:
            //break;
            default:
                this.LlistDeckCard.addView('card1_list', _cardno, _cardlv, _cardcost);
                break;

        }
    }

    callbackImgSelect(_index: integer) {
        console.log('callbackImgSelect : ' + _index);
		gCardDeckSelectImgIndex = _index;
		gCardDeckViewState = CARD_DECK_VIEW_CLICK_CHAR;
    }

    onClickedCardListUp() {
        console.log('onClickedCardListUp index: ' + gStartIndex);
        if (gStartIndex > 0) {
			gStartIndex -= 3;
			this.mCurrentPage -= 1;
            gCardUpdated = true;
        }
    }

    onClickedCardListRight() {
        console.log('onClickedCardListRight');
        if (gCardDeckSelectImgIndex != 0) {
            gCardDeckViewState = CARD_DECK_VIEW_CLICK_RIGHT_BTN;
        } else {
            alert('캐릭터 선택을 먼저 하십시오.');
        }
    }

    onClickedCardListLeft() {
        console.log('onClickedCardListLeft');
        if (gCardDeckSelectImgIndex > 3 && gCardDeckSelectImgIndex < 7) {
            gCardDeckViewState = CARD_DECK_VIEW_CLICK_LEFT_BTN;
        } else {
            alert('덱 카드를 선택 하십시오.');
        }

    }
    onClickedCardListDown() {
        console.log('onClickedCardListDown index:' + gStartIndex + ' maxlen:' + gCardListMaxLen);
        if ((gStartIndex + 3) < gCardListMaxLen) {
			gStartIndex += 3;
			this.mCurrentPage += 1;
            gCardUpdated = true;
        }
    }

    onClickedCardDeckUp() {
        console.log('onClickedCardDeckUp');
        if (gDeckStartIndex > 0) {
			gDeckStartIndex -= 3;
			this.mDeckCurrentPage -= 1;
            gCardUpdated = true;
        }

    }
    onClickedCardDeckDown() {
        console.log('onClickedCardDeckDown');
        if ((gDeckStartIndex + 3) < gCardDeckListMaxLen) {
			gDeckStartIndex += 3;
			this.mDeckCurrentPage += 1;
            gCardUpdated = true;
        }
    }

}
