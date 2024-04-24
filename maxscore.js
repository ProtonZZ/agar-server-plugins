// maks skoru hesaplayıp ekrana yazdır

window.addEventListener('gameover', resetMaxUserScore);
window.addEventListener('beforeunload', resetMaxUserScore);

function resetMaxUserScore() {
    localStorage.maxUserScore = JSON.stringify(0);
}

function updateMaxUserScore() {
    var currentScore = calcUserScore();
    var maxUserScore = 0;

    try {
        maxUserScore = JSON.parse(localStorage.maxUserScore || '0');
    } catch (e) {
    }

    if (currentScore > maxUserScore) {
        maxUserScore = currentScore;
        localStorage.maxUserScore = JSON.stringify(maxUserScore);
    }

    if (null == scoreText) {
        scoreText = new UText(20, '#FFFFFF');
    }

    scoreText.setValue('Max: ' + ~~(maxUserScore / 100));
    var c = scoreText.render();
    var a = c.width;
   ctx.fillStyle = "";
ctx.globalAlpha =.3;
ctx.globalAlpha = 1;
    ctx.drawImage(c, 5 + 5, 53); 
}

updateMaxUserScore();

userScore = Math.max(userScore, calcUserScore());
updateMaxUserScore();
