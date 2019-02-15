function DataBaseLogin(arg_user_id, callback) {
    console.log('js databaselogin E');
    console.log(arg_user_id);

    var allData = { functionname: "login", arguments: arg_user_id };

    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                gId = obj.userinfo.did;
                gName = obj.userinfo.dname;
                gLv = obj.userinfo.dlv;
                gExp = obj.userinfo.dexp;
                gCost = obj.userinfo.dcost;
                gGold = obj.userinfo.dgold;
                gStory = obj.userinfo.dstory;

                console.log(gId);
                console.log(gName);
                console.log(gLv);
                console.log(gExp);
                console.log(gGold);
                console.log(gStory);
                callback(1);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
};

function DataBaseUpdateStory(_story, callback) {

    var allData = { functionname: "updateStory", arguments: gId, story: _story };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                callback(1);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
}

function DataBaseGetCard(callback) {
    var allData = { functionname: "getCard", arguments: gId };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
}

function DataBaseGetCardList(callback) {
    var allData = { functionname: "getCardList", arguments: gId };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
}

function DataBaseGetCardDeckList(callback) {
    var allData = { functionname: "getCardDeckList", arguments: gId };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
}

function DataBaseSetDeckCard(callback, _cardNo) {
    var allData = { functionname: "setCardDeck", arguments: gId, cardno: _cardNo };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(obj['error']);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(-1);
        }
    });
}

function DataBaseDelDeckCard(callback, _cardNo) {
    var allData = { functionname: "delCardDeck", arguments: gId, cardno: _cardNo };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(obj['error']);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(-1);
        }
    });
}

function DataBaseGetEnemyInfo(callback, _enemyNumber) {
    var allData = { functionname: "getEnemyInfo", arguments: gId, enemyno: _enemyNumber };

    console.log(allData);
    jQuery.ajax({
        type: "POST",
        url: './src/Utils/DataBase.php/',
        data: allData,

        success: function (obj) {
            console.log('succes');
            console.log(obj);

            if (obj.error != null) {
                console.log(obj.error);
                callback(0);
            } else {
                callback(obj['succ']);
            }
        },
        error: function (request, status, error) {
            console.log(request.status);
            console.log(error);
            callback(0);
        }
    });
}

function DataBaseUserInfoUpdate(callback) {
	var allData = { functionname: "UserInfoUpdate", arguments: gId, lv: gLv, exp: gExp, gold: gGold, cost: gCost, story: gStory };

	console.log(allData);
	jQuery.ajax({
		type: "POST",
		url: './src/Utils/DataBase.php/',
		data: allData,

		success: function (obj) {
			console.log('succes');
			console.log(obj);

			if (obj.error != null) {
				console.log(obj.error);
				callback(0);
			} else {
				callback(obj['succ']);
			}
		},
		error: function (request, status, error) {
			console.log(request.status);
			console.log(error);
			callback(0);
		}
	});
}
