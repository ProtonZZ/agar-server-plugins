
Commands.list.userinfo = function(gameServer, split) {
  var id = parseInt(split[1]);
  if (isNaN(id)) {
    console.log("\u001B[36mServer: \u001B[0mlutfen gecerli bir oyuncu id gir");
    return;
  }

  var client = null;
  for (var i = 0; i < gameServer.clients.length; i++) {
    if (gameServer.clients[i].playerTracker.pID == id) {
      client = gameServer.clients[i].playerTracker;
      break;
    }
  }

  if (client == null) {
    console.log("\u001B[36mServer: \u001B[0moyuncu bulunamadı!");
    return;
  }

  var ip = "BOT";
  if (typeof gameServer.clients[i].remoteAddress != 'undefined') {
    ip = gameServer.clients[i].remoteAddress;
  }

  var nick = (client.name == "") ? "Oyuncu seçilmedi" : client.name;
  var cells = client.cells.length;
  var score = client.getScore(true);
  var position = client.centerPos.x.toFixed(0) + ", " + client.centerPos.y.toFixed(0);
  var spectator = client.spectate ? "izleyici" : "oyunda";

  console.log("oyuncu ID: " + id);
  console.log("IP adresi: " + ip);
  console.log("Parçalar: " + cells);
  console.log("Skor: " + score);
  console.log("Maks Skor: " +  NaN);
  console.log("Pozisyonu: " + position);
  console.log("Statü: " + spectator);
};


