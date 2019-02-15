/*-----------------------------------------------------------
 * 전역 변수
 * 게임 설정
------------------------------------------------------------*/
var DBG = 1;
var game;
var gameWidth = 1280;
var gameHeight = 720;

var GameConfig;
var canvas;

/*----------------------------------------------------------------
 * 
 * 스타일
 * 
 ----------------------------------------------------------------*/
var gTextHpStyle = { fontFamily: 'Arial', fontSize: '32px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
var gTextTimerstyle = { fontFamily: 'Arial', fontSize: '32px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
var gTextResultStyle = { fontFamily: 'Arial', fontSize: '32px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
var gTextWindowStyle = { fontFamily: 'Arial', fontSize: '24px', wordWrap: true };
var gTextBtnUiStyle = { fontFamily: 'Arial', fontSize: '24px', fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
/*-------------------------------------------------------------
 * 캐릭터 대화상자
 * 
--------------------------------------------------------------*/
var uiTWcontent;
var uiTWtext;
var uiTWline = [];
var uiTWwordIndex = 0;
var uiTWlineIndex = 0;
var uiTWwordDelay = 2;//30//120
var uiTWlineDelay = 1000;//200//400
var uiTWTimer;
/*------------------------------------------------------------
 * 
 * 유저 정보
 * 
--------------------------------------------------------------*/
var gId;
var gName;
var gLv;
var gExp;
var gCost;
var gGold;
var gStory;
var gHp;

declare const gapi: any;

declare function googleCreate(): any;

declare function DataBaseLogin(arg_user_id, callback): any;
declare function DataBaseUpdateStory(_story, callback): any;
declare function DataBaseGetCard(callback): any;

declare function DataBaseGetCardList(callback): any;
declare function DataBaseGetCardDeckList(callback): any;
declare function DataBaseSetDeckCard(callback, _cardNo): any;
declare function DataBaseDelDeckCard(callback, _cardNo): any;
declare function DataBaseUserInfoUpdate(callback): any;

declare function uiTWcreate(_scene, _txt): any;
declare function uiTWnextLine(_scene): any;

/*----------------------------------------------------------------
 * 
 * Stage 설정 정보
 * 
 ----------------------------------------------------------------*/
declare function Stage1Create(_scene): any;
declare function Stage1Sprite(_scene): any;
declare function Stage1Action(_scene): any;

/*----------------------------------------------------------------
 * 
 * 뽑기 씬 전역 변수
 * 
 ----------------------------------------------------------------*/
var gRandomSceneStated;

/*----------------------------------------------------------------
 * 
 * 덱 설정 씬 전역 변수
 * 
 ----------------------------------------------------------------*/
var gCardUpdated;
var gCardList;
var gCardDeckList;

var gViewMaxLen = 3;
var gCardListMaxLen;
var gCardDeckListMaxLen;

var gStartIndex;
var gDeckStartIndex;

var CARD_DECK_VIEW_IDLE = 0;
var CARD_DECK_VIEW_GET_CARD_LIST = 1;
var CARD_DECK_VIEW_GET_CARD_LIST_ING = 2;
var CARD_DECK_VIEW_GET_CARDDECK_LIST = 3;
var CARD_DECK_VIEW_CLICK_RIGHT_BTN = 4;
var CARD_DECK_VIEW_CLICK_LEFT_BTN = 5;
var CARD_DECK_VIEW_RESTART = 6;
var CARD_DECK_VIEW_CLICK_CHAR = 7;

var gCardDeckViewState;
var gCardDeckSelectImgIndex;

var gCardDeckCurrentCost = 0;

/*----------------------------------------------------------------
 * 
 * 전투 씬 전역 변수
 * 
 ----------------------------------------------------------------*/
var gbattleStage = 0;
var gTileWidthCont = 4;
var gtitleHeght = 3;
var gShowMaxLen = 4;
var gCurrentViewLen = 0;

var gSelectTimer = 0;
var BATTLE_VIEW_DEFAULT_SELECT_TIMER = 10;

var gisSetCharacter;
var gTempObjectX;
var gTempObjectY;

var gBattleViewState = 0;
var BATTLE_VIEW_IDLE = 0;
var BATTLE_VIEW_GET_DECK_LIST = 1;
var BATTLE_VIEW_GET_UI_ENEMY = 2;
var BATTLE_VIEW_TIME_OVER = 3;
var BATTLE_VIEW_SELECT_CHAR = 4;
var BATTLE_VIEW_EMENY_TURN = 5;
var BATTLE_VIEW_RETURN_MY_TURN = 6;
var BATTLE_VIEW_MY_ACTION = 7;
var BATTLE_VIEW_MY_ACTIONING = 8;
var BATTLE_VIEW_ENEMY_ACTION = 9;
var BATTLE_VIEW_GAME_OVER = 10;
var BATTLE_VIEW_GAME_VICTORY = 11;

/* 적 변수 */
var gEnemyHp;
var gEnemyCardList;

/* 캐릭터 얼굴 크기 */
var gUnitFaceSizeX = 120;
var gUnitFaceSizeY = 120;

/* 캐릭터 크기 */
var gUnitSizeX = 120;
var gUnitSizeY = 100;


function shuffle(a) {
    var j, x, i;
    for (i = Object.keys(a).length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function diff(num1, num2) {
    if (num1 > num2) {
        return (num1 - num2);
    } else {
        return (num2 - num1);
    }
};

function dist(x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
};
