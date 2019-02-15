<?php
	
	function DataBaseGetCard($mysql, $user_id) {
	
		$index = 1;
		$no = 0;
		$cardid = 0;
		$cardname = "NULL";
		$cardcost = 0;
		$cardhp = 0;
		$cardatt = 0;
		$cardatttype = 0;
		$cardskill = 0;
		$cardrandom = 0;
		$cardlv = 0;
		$cardexp = 0;

		$r=mt_rand(1,100);
		// range 1, 5, 15, 25, 54
		if ($r == 1) {
			$r = 1;
		} else if ($r > 1 && $r <= 6) {
			$r = 5;
		} else if ($r > 6 && $r <= 21) {
			$r = 15;
		} else if ($r > 21 && $r <= 46) {
			$r = 25;
		} else {
			$r = 54;
		}

		//select * from cardinfo where cardrandom >= 20;
		if ( !$result = $mysql->query("SELECT * from cardinfo where cardrandom = $r") ) {
			return -1;
		}

		if ( $result->num_rows == 0 ) {
			return -2;
		}

		$get = mt_rand(1, $result->num_rows);
		//MYSQLI_NUM , MYSQLI_ASSOC, MYSQLI_BOTH 
		while($row = $result->fetch_array(MYSQLI_NUM)) {
			if ( $index == $get ) {
				$cardid = $row[0];
				$cardname = $row[1];
				$cardcost = $row[2];
				$cardhp = $row[3];
				$cardatt = $row[4];
				$cardatttype = $row[5];
				$cardskill = $row[6];
				$cardrandom = $row[7];
				$cardlv = 1;
				$cardexp = 0;
				break;
			}
			$index = $index+1;
		}
		
		if ( $cardlv == 0 ) {
			return -3;
		}

		$selectNo = "select min(no+1) from `$user_id"."_cardinfo` where ( no+1 not in (select no from "."`$user_id"."_cardinfo`))";

		if ( !$result = $mysql->query($selectNo) ) {
			return -4;
		}

		if ( $result->num_rows == 0 ) {
			$no = 1;
		} else {
			while($row = $result->fetch_array(MYSQLI_NUM)) {
				if ( $row[0] == 0 || $row[0] == null ) {
					$no = 1;
				} else {
					$no = $row[0];
				}
			}
		}

		$insertCard = "INSERT `$user_id"."_cardinfo` value ($no, $cardid, '$cardname', $cardcost, $cardhp, $cardatt, $cardatttype, $cardskill, $cardrandom, $cardlv, $cardexp)";
		if ( !$result = $mysql->query($insertCard) ) {
			return -5;
		}

		return $cardid;
	}
?>
