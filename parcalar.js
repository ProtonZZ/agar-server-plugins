function calcUserCells() {
    return playerCells.length;
}

var userCells = 0;
var cellsText = null;

userCells = Math.max(userCells, calcUserCells());
if (0 != userCells) {
    if (null == cellsText) {
        cellsText = new UText(19, '#FFFFFF');
    }
    cellsText.setValue('Parçalar: ' + (userCells +  '/16'));
    var c = cellsText.render();
    var a = c.width;
    ctx.globalAlpha = .3;
    ctx.fillStyle = '';
    ctx.globalAlpha = .9;
    ctx.drawImage(c, 5 + 5, 90); 
}

