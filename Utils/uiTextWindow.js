
function uiTWcreate(_scene, _txt) {

    console.log('uiTWcreate');

    maxWidth = _scene.game.canvas.width / 2;

	uiTWcontent = _txt;
	uiTWtext = _scene.add.text(50, _scene.game.canvas.height - 100, '', gTextWindowStyle);
    uiTWnextLine(_scene);
}

function uiTWnextLine(_scene) {
   
    if (uiTWlineIndex >= uiTWcontent.length) {
        //  We're finished
        return 0;
    }
    uiTWtext.setText(uiTWtext.text.concat(uiTWcontent[uiTWlineIndex] + ""));
    uiTWlineIndex++;

    return 1;
}

function uiTWwrite(_scene) {
    uiTWtext.setText(uiTWtext.text.concat(uiTWcontent[uiTWlineIndex] + ""));
}