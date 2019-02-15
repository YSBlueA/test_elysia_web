window.onload = () => {
    var firstRunLandscape;
    var gameRatio = window.innerWidth / window.innerHeight;
    
    GameConfig = {
        type: Phaser.AUTO,
        autoStart: true,
        width: gameWidth,
        height: gameHeight,
        physics: {
            default: 'matter',
            matter: {
                gravity: {
                    x: 0,
                    y: 0
                }
            }
        },
        scene: { SceneLogin, SceneMain, ScenePrologue, SceneStory, SceneBattle, SceneDeckCard, SceneShop, SceneRandom, SceneResult },
        //backgroundColor: "#FFFFFF"
    };

    game = new Phaser.Game(GameConfig);
    game.scene.add('LoginScene', SceneLogin);
    game.scene.add('MainScene', SceneMain);
    game.scene.add('PrologueScene', ScenePrologue);
    game.scene.add('StoryScene', SceneStory);
    game.scene.add('BattleScene', SceneBattle);
    game.scene.add('DeckCardScene', SceneDeckCard);
    game.scene.add('ShopScene', SceneShop);
	game.scene.add('RandomScene', SceneRandom);
	game.scene.add('ResultScene', SceneResult);
    game.scene.start('LoginScene');

    resize();
    window.addEventListener("resize", resize, false);

    game.prototype = {
        preload: function () {
            firstRunLandscape = game.scale.isGameLandscape;
            game.scale.forceOrientation(false, true);
            game.scale.enterIncorrectOrientation.add(handleIncorrect);
            game.scale.leaveIncorrectOrientation.add(handleCorrect);

        },
    };
    
    function handleIncorrect() {
        if (!game.device.desktop) {
            document.getElementById("turn").style.display = "block";
        }
    }

    function handleCorrect() {
        if (!game.device.desktop) {
            if (firstRunLandscape) {
                gameRatio = window.innerWidth / window.innerHeight;
                game.width = Math.ceil(640 * gameRatio);
                game.height = 640;
                game.renderer.resize(game.width, game.height);
                game.state.start("Play");
            }
            document.getElementById("turn").style.display = "none";
        }
    }
}

function resize() {
    canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
