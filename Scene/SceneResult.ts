class SceneResult extends Phaser.Scene {

	mTxResult: Phaser.GameObjects.Text;
	mTxResultExp: Phaser.GameObjects.Text;
	mTxResultGole: Phaser.GameObjects.Text;

	mIsCreated: boolean;

	mAddExp: number;
	mAddGold: number;

	mNextTimer: Phaser.Time.TimerEvent;

	constructor(config) {
		super({
			key: 'ResultScene',
			physics: {
				system: 'impact',
				gravity: 100
			}
		});
		console.log(config);

		Phaser.Scene.call(this, { key: 'ResultScene' });

	}
	init() {

	}

	preload() {

	}

	create() {
		this.mTxResult = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 3, 'GAME OVER' + gSelectTimer, gTextResultStyle);

		this.viewInit();

		this.events.on('wake', function () {
			console.log('wake : ' + this.mIsCreated);

			if (this.mIsCreated == 1) {
				this.mIsCreated = 0;
				this.viewInit();
			}
		}, this);

		this.events.on('sleep', function () {
			console.log('sleep');
			this.mIsCreated = 1;
		}, this);
	}

	update() {

	}

	viewInit() {
		if (gBattleViewState == BATTLE_VIEW_GAME_OVER) {
			this.mTxResult.setText('GAME OVER');			
		} else if (gBattleViewState == BATTLE_VIEW_GAME_VICTORY) {
			this.mTxResult.setText('VICTORY');
		}

		if (gBattleViewState == BATTLE_VIEW_GAME_OVER) {
			this.mAddExp = 10;
			this.mAddGold = 10;
		} else {
			switch (gbattleStage) {
				case 0x11:
				//break;
				default:
					this.mAddExp = 100;
					this.mAddGold = 100;
					gStory = 2;
					break;
			}
		}
		console.log('before gexp : ' + gExp + ', gold : ' + gGold);
		gExp = +gExp + this.mAddExp;
		gGold = +gGold + this.mAddGold;
		console.log('after gexp : ' + gExp + ', gold : ' + gGold);

		this.add.text(this.game.canvas.width - 250, this.game.canvas.height / 2, '경험치 : +' + this.mAddExp, gTextResultStyle).setOrigin(0, 0.5);

		this.add.text(this.game.canvas.width - 250, (this.game.canvas.height / 2) + 100, '골드 : +' + this.mAddGold, gTextResultStyle).setOrigin(0, 0.5);

		DataBaseUserInfoUpdate(this.resultCollback);
		this.time.addEvent({ delay: 3000, callback: this.NextStory, callbackScope: this, repeat: 0 });
	}

	resultCollback(_result) {
		console.log('resultcallback:' + _result);

	}

	NextStory() {
		game.scene.switch('ResultScene', 'StoryScene');
	}
}