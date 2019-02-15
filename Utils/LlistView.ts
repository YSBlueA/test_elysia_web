/* custom list view */

class objStruct {

    mSprite: Phaser.GameObjects.Sprite;
    mTxlv: Phaser.GameObjects.Text;
    mTxcost: Phaser.GameObjects.Text;

    mIntLv: integer;
    mIntCost: integer;
    mIntNo: integer;

    constructor(_sprite, _txlv, _txcost, _intlv, _intcost, _intno) {
        this.mSprite = _sprite;
        this.mTxlv = _txlv;
        this.mTxcost = _txcost;
        this.mIntLv = _intlv;
        this.mIntCost = _intcost;
        this.mIntNo = _intno;
    }

    add(_sprite, _txlv, _txcost, _intlv, _intcost, _intno) {
        this.mSprite = _sprite;
        this.mTxlv = _txlv;
        this.mTxcost = _txcost;
        this.mIntLv = _intlv;
        this.mIntCost = _intcost;
        this.mIntNo = _intno;
    }

    getSprite() {
        return this.mSprite;
    }
    getTxLv() {
        return this.mTxlv;
    }
    getTxCost() {
        return this.mTxcost;
    }

    getIntLv() {
        return this.mIntLv;
    }

    getIntCost() {
        return this.mIntCost;
    }

    getIntNo() {
        return this.mIntNo;
    }
}

class LlistView {
    lee_listView_scene: Phaser.Scene;
    lee_listView_x: integer;
    lee_listView_y: integer;
    lee_listView_width: integer;
    lee_listView_height: integer;

    lee_listView_pos_x: integer;
    lee_listView_pos_y: integer;

    static list: Array<objStruct>;
    static lee_listView_index: integer;

    static minHeight: integer;
    static maxHeight: integer;
    static imgHeight: integer;

    static standardWidth: integer;
    static standardHeight: integer;

    static pendingWidth: integer;
    static pendingHeight: integer;

    static selectImagePos: integer;

    static mCallBack;

    constructor(_scene, _x, _y, _width, _height) {
        this.lee_listView_scene = _scene;
        this.lee_listView_x = _x;
        this.lee_listView_y = _y;
        this.lee_listView_width = _width;
        this.lee_listView_height = _height;

        this.lee_listView_pos_x = _x;
        this.lee_listView_pos_y = _y;

        LlistView.minHeight = _y;
        LlistView.maxHeight = _height;
        LlistView.imgHeight = 0;

        LlistView.standardWidth = this.lee_listView_scene.game.canvas.width / 8;
        LlistView.pendingWidth = 20;
        LlistView.pendingHeight = 20;

        LlistView.list = new Array<objStruct>();

        this.lee_listView_pos_x = this.lee_listView_pos_x + LlistView.pendingWidth / 2 + LlistView.standardWidth;
        this.lee_listView_pos_y = this.lee_listView_pos_y + LlistView.pendingHeight / 2;

        LlistView.selectImagePos = 0;
    }

    addView(_image_key, _no, _lv, _cost) {
        var img = this.lee_listView_scene.add.sprite(this.lee_listView_pos_x, this.lee_listView_pos_y, _image_key);
        img.setOrigin(0, 0);
        img.setInteractive();
        LlistView.selectImagePos++;
        img.setName(LlistView.selectImagePos.toLocaleString());

        img.setDisplaySize(img.width - LlistView.pendingWidth, img.height - LlistView.pendingHeight);

        var style_tx = { fontFamily: 'Arial', fontSize: '24px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
        console.log('DEBUG] card LV : ' + _lv);
        var lv = this.lee_listView_scene.add.text(32, 32, 'LV: ' + _lv, style_tx);
        var cost = this.lee_listView_scene.add.text(32, 32, 'COST: ' + _cost, style_tx);

        lv.x = Math.floor((img.x + (img.width - img.width / 4) + cost.width / 2) - LlistView.pendingWidth - 80);
        lv.y = Math.floor((img.y + (img.height / 2) - (lv.height * 2)));
        lv.setOrigin(0, 0);

        cost.x = Math.floor((img.x + (img.width - img.width / 4) + cost.width / 2) - LlistView.pendingWidth - 80);
        cost.y = Math.floor((img.y + (img.height / 2) + (cost.height)) - LlistView.pendingHeight);
        cost.setOrigin(0, 0);

        this.lee_listView_pos_y += img.height;
        LlistView.imgHeight = img.height;

        LlistView.list.push(new objStruct(img, lv, cost, _lv, _cost, _no));

        img.on('pointerdown', () => this.onImgClicked(img));

        //this.lee_listView_scene.input.setDraggable(img); // 움직이지 못하게 수정함.

        this.lee_listView_scene.input.on('dragstart', function (pointer, gameObject) {
            LlistView.lee_listView_index = 0;
            if (LlistView.list == undefined) {
                console.log('list is null');
            }
            for (var i = 0; i < LlistView.list.length; i++) {
                var mspri = LlistView.list[i].getSprite();
                if (gameObject == mspri) {
                    LlistView.lee_listView_index = i;
                    this.lee_listView_scene.children.bringToTop(mspri);
                    this.lee_listView_scene.children.bringToTop(LlistView.list[i].getTxLv());
                    this.lee_listView_scene.children.bringToTop(LlistView.list[i].getTxCost());
                }
            }
        }, this);

        this.lee_listView_scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (gameObject.y > LlistView.maxHeight) {
                console.log('over dragy: ' + gameObject.y + ' posy: ' + LlistView.maxHeight);
                gameObject.y = LlistView.maxHeight;

            } else if (gameObject.y < LlistView.minHeight) {
                console.log('lower dragy: ' + gameObject.y + ' posy: ' + LlistView.minHeight);
                gameObject.y = LlistView.minHeight;
            }
            else {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
            var lv = LlistView.list[LlistView.lee_listView_index].getTxLv();
            var cost = LlistView.list[LlistView.lee_listView_index].getTxCost();

			lv.x = Math.floor((img.x + (img.width - img.width / 4) + cost.width / 2) - LlistView.pendingWidth);
            lv.y = Math.floor((img.y + (img.height / 2) - (lv.height * 2)) - LlistView.pendingHeight);
            lv.setOrigin(0, 0);

            cost.x = Math.floor((img.x + (img.width - img.width / 4) + cost.width / 2) - LlistView.pendingWidth);
            cost.y = Math.floor((img.y + (img.height / 2) + (cost.height)) - LlistView.pendingHeight);
            cost.setOrigin(0, 0);

        });

        this.lee_listView_scene.input.on('dragend', function (pointer, gameObject) {
            // update list
        });
    }

    addIndex() {

    }

    onImgClicked(_img) {
        console.log('onImgClicked');
        console.log(_img);
        console.log('check name');
        console.log(_img.name);
        //_img.setTint(0xff0000);
        if (LlistView.mCallBack != null) {
            LlistView.mCallBack(parseInt(_img.name));
        }
    }

    setDeckImageCallBack(_callBack: Function) {
        console.log('setDeckImageCallBack');
        LlistView.mCallBack = _callBack;
    }

	clear() {
        var dataLen = LlistView.list.length;
        for (var i = 0; i < dataLen; i++) {
            var cardList = LlistView.list.pop();
            cardList.getSprite().destroy();
            cardList.getTxLv().destroy();
            cardList.getTxCost().destroy();
        }

        this.lee_listView_pos_x = this.lee_listView_x + LlistView.pendingWidth / 2 + LlistView.standardWidth;
        this.lee_listView_pos_y = this.lee_listView_y + LlistView.pendingHeight / 2;

        LlistView.selectImagePos = 0;
    }

    getIndexCost(_index: integer) {
        // index offset 1, list offset 0 때문에 리스트 -1를 해준다.
        return LlistView.list[_index -1].getIntCost();
    }

    getIndexNo(_index: integer) {
        // index offset 1, list offset 0 때문에 리스트 -1를 해준다.
        return LlistView.list[_index - 1].getIntNo();
    }
}
