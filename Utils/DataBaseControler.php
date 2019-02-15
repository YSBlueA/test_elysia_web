<?php
	
    function connect() {
        $mysql_hostname = [DB_HOST]
        $mysql_user = [DB_USER]
        $mysql_password = [DB_PASSWORD]
        $mysql_database = [DB_DB_NAME]
        //setup a connection with mySQL
        $mysqli = new mysqli($mysql_hostname, $mysql_user, $mysql_password,$mysql_database);
        /* check connection */
        if (mysqli_connect_errno()) {
            return -1;
        }
        //enable utf8!
        $mysqli->query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

        return $mysqli;
    }

	function close($mysql) {
		$mysql->close();
	}

	function getUserInfo($mysql, $user_id) {
		// select * from userinfo where did = 'test';
		if ( !$result = $mysql->query("SELECT * from userinfo where did = '$user_id'") ) {
			return -1;
		}
		
		if ( $result->num_rows == 0 ) {
			return -2;
		}
		$response = array();

		while($row = $result->fetch_array(MYSQLI_ASSOC)) {
			$response['userinfo'] = $row;
		}
		$result->free();
		return $response;
	}

	function addUserinfo($mysql, $user_id) {
		if ( !$result = $mysql->query("INSERT userinfo value('$user_id', 'TEMP', 1, 0, 25, 0, 0);")) {
				return -1;
		}
		$response = array();
		// Init Data
		$groupData = array();
		$groupData["did"] = "$user_id";
		$groupData["dname"] = "TEMP";
		$groupData["dlv"] = "1";
		$groupData["dexp"] = "0";
		$groupData["dcost"] = "25";
		$groupData["dgold"] = "0";
		$groupData["dstory"] = "0";
		$response['userinfo'] = $groupData;

		//create table ys_ ( cardid int, cardname varchar(20), cardhp int, cardatt int, cardatttype int, cardskill int, cardrandom int, cardlv int, cardexp int);
		$createusercard = "create table `$user_id"."_cardinfo` (no int PRIMARY KEY, cardid int, cardname varchar(20), cardcost int, cardhp int, cardatt int, cardatttype int, cardskill int, cardrandom int, cardlv int, cardexp int);";
		if ( !$result = $mysql->query($createusercard)) {
				return -1;
		}

		$createusercard = "create table `$user_id"."_cardset` (no int PRIMARY KEY, cardid int, cardname varchar(20), cardcost int, cardhp int, cardatt int, cardatttype int, cardskill int, cardrandom int, cardlv int, cardexp int);";
		if ( !$result = $mysql->query($createusercard)) {
				return -1;
		}

		return $response;
	}

	function updateUserStory($mysql, $user_id, $_story) {
		//update userinfo set dstory = 1 where did = 'ys.blueangel';
		if ( !$result = $mysql->query("UPDATE userinfo set dstory = $_story where did = '$user_id';") ) {
				return -1;
		}
		return 0;
	}

	function getCardList($mysql, $user_id) {
		// select * from userinfo where did = 'test';
		$i = 0;
		if ( !$result = $mysql->query("SELECT * from `$user_id"."_cardinfo`") ) {
			return -1;
		}
		
		if ( $result->num_rows == 0 ) {
			return 0;
		}
		$response = array();

		while($row = $result->fetch_array(MYSQLI_ASSOC)) {
			$response[$i++] = $row;
		}
		$result->free();
		return $response;
	}

	function getCardDeckList($mysql, $user_id) {
		// select * from userinfo where did = 'test';
		$i = 0;
		if ( !$result = $mysql->query("SELECT * from `$user_id"."_cardset`") ) {
			return -1;
		}
		
		if ( $result->num_rows == 0 ) {
			return 0;
		}
		$response = array();

		while($row = $result->fetch_array(MYSQLI_ASSOC)) {
			$response[$i++] = $row;
		}
		$result->free();
		return $response;
	}

	function setCardDeck($mysql, $user_id, $cardno) {
		if ( !$result = $mysql->query("SELECT * from `$user_id"."_cardset` where no = $cardno") ) {
			return -1;
		}

		if ( $result->num_rows != 0 ) {
			return -2; // 이미 같은 카드가 등록되어 있다.
		}

		if ( !$result = $mysql->query("SELECT * from `$user_id"."_cardinfo` where no = $cardno") ) {
			return -3;
		}

		if ( $result->num_rows == 0 ) {
			return -4; // 카드 정보를 가져오지 못함.
		}

		while($row = $result->fetch_array(MYSQLI_NUM)) {
			$cardid = $row[1];
		}
		$result->free();

		if ( !$result = $mysql->query("SELECT * from `$user_id"."_cardset` where no = $cardno or cardid = $cardid") ) {
			return -5;
		}

		if ( $result->num_rows != 0 ) {
			return -6; // 이미 같은(CARDID) 카드가 등록되어 있다.
		}
		
		if ( !$result = $mysql->query("insert into `$user_id"."_cardset` (select * from `$user_id"."_cardinfo` where no = $cardno);") ) {
			return -7;
		}
		
		return 0;
	}

	//delCardDeck
	function delCardDeck($mysql, $user_id, $cardno) {
	//delete from `ys.blueangel_cardset` where no = 1
		if ( !$result = $mysql->query("delete from `$user_id"."_cardset` where no = $cardno") ) {
			return -1;
		}
		return 0;
	}

	function getEnemyInfo($mysql, $user_id, $enemyNo) {
		// select * from userinfo where did = 'test';
		$i = 0;
		if ( !$result = $mysql->query("SELECT * from enemy_info where stage = $enemyNo") ) {
			return -1;
		}
		
		if ( $result->num_rows == 0 ) {
			return -2;
		}
		$response = array();

		while($row = $result->fetch_array(MYSQLI_ASSOC)) {
			$response[$i++] = $row;
		}
		$result->free();

		if ( !$result = $mysql->query("SELECT * from stage"."$enemyNo"."_cardinfo") ) {
			return -3;
		}

		if ( $result->num_rows == 0 ) {
			return -4;
		}

		while($row = $result->fetch_array(MYSQLI_ASSOC)) {
			$response[$i++] = $row;
		}
		$result->free();

		return $response;
	}

	function UserInfoUpdate($mysql, $user_id, $user_lv, $user_exp, $user_gold, $user_cost, $user_story) {
//#update userinfo set dlv = 2, dexp = '10', dcost = '30', dgold = '10', dstory = '2' where did = 'poiq11'
		if ( !$result = $mysql->query("UPDATE userinfo set dlv = '$user_lv', dexp = '$user_exp', dcost = '$user_cost', dgold = '$user_gold', dstory = '$user_story' where did = '$user_id'") ) {
			return -1;
		}

		return 0;
	}
	
?>
