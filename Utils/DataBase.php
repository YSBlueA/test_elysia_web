
<?php
    header('Content-Type: application/json; charset=utf-8');
	include ('DataBaseControler.php');
	include ('DataBaseRandomControler.php');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!!!'; }
    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!!!'; }

	$db = connect();

    if( !isset($aResult['error']) ) {
        switch($_POST['functionname']) {
            case 'login':
				try {
					$userId = $_POST['arguments'];
					$result = getUserInfo($db, $userId);

					if ( $result == -1 ) {
						$aResult['error'] = 'error get user info in mysql';
				    }

					else if ( $result == -2 ) {
						$result = addUserinfo($db, $userId);
						if ( $result == -1 ) {
							$aResult['error'] = 'insert error in mysql';
						} else {
							$aResult = $result;
						}
					}
					else {
						$aResult = $result;
					}
				}catch (exception $e) {
					$aResult['error'] = 'error exception login';
				}
               break;
			case 'updateStory':
				try {
					$userid = $_POST['arguments'];
					$story = $_POST['story'];
					$result = updateUserStory($db, $userid, $story);
					if ( $result == -1 ) {
						$aResult['error'] = 'error update story in mysql';
					} else {
						$aResult['succ'] = 'succ';
					}
				} catch (exception $e) {
					$aResult['error'] = 'error exception update story';
				}
				break;
			case 'getCard':
				try {
					$userId = $_POST['arguments'];
					$result = DataBaseGetCard($db, $userId);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card';
				}
				break;

			case 'getCardList':
				try {
					$userId = $_POST['arguments'];
					$result = getCardList($db, $userId);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
			case 'getCardDeckList':
				try {
					$userId = $_POST['arguments'];
					$result = getCardDeckList($db, $userId);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
			case 'setCardDeck':
				try {
					$userId = $_POST['arguments'];
					$cardno = $_POST['cardno'];
					$result = setCardDeck($db, $userId, $cardno);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
			case 'delCardDeck':
				try {
					$userId = $_POST['arguments'];
					$cardno = $_POST['cardno'];
					$result = delCardDeck($db, $userId, $cardno);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
			case 'getEnemyInfo':
				try {
					$userId = $_POST['arguments'];
					$enemyNo = $_POST['enemyno'];
					$result = getEnemyInfo($db, $userId, $enemyNo);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = $result;
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
			case 'UserInfoUpdate':
				try {
					$userId = $_POST['arguments'];
					$userlv = $_POST['lv'];
					$userexp = $_POST['exp'];
					$usergold = $_POST['gold'];
					$usercost = $_POST['cost'];					
					$userstory = $_POST['story'];
					
					$result = UserInfoUpdate($db, $userId, $userlv, $userexp, $usergold, $usercost, $userstory);
					if ( $result < 0 ) {
						$aResult['error'] = $result;
					} 
					else if( $result == 0 ) {
						$aResult['succ'] = '0';
					}
					else {
						$aResult['succ'] = '0';
					}
				} catch ( exception $e ) {
					$aResult['error'] = 'error exception get card list';
				}
				break;
            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }
    }
	close($db);
    echo json_encode($aResult);
?>
