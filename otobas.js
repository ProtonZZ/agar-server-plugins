// otobas start //

function say(gameServer, messageParts) {
  var message = messageParts.join(" ");
  var packet = new Packet.BroadCast(message);
  for (var i = 0; i < gameServer.clients.length; i++) {
    gameServer.clients[i].sendPacket(packet);
  }
  console.log("\u001B[36mServer: \u001B[0m" + message);
}


Commands.list.otobas = function(gameServer, split) {
  if (split.length < 2) {
    console.log("\u001B[36mServer: \u001B[0mKUllanım: otobas <saniye>");
    return;
  }

  var duration = parseInt(split[1]);

  if (isNaN(duration)) {
    console.log("\u001B[36mServer: \u001B[0mgeçerli bir  sayı değer gir");
    return;
  }

  say(gameServer, ["Otomatik-büyüme başladı"  +  duration  + "saniye" ]);

  var startTime = Date.now();
  gameServer.intervalId = setInterval(function() {
    if (Date.now() - startTime >= duration * 1000) {
      clearInterval(gameServer.intervalId);

      say(gameServer, ["Otomatik-büyüme sona erdi!"]);

      return;
    }

    for (var clientId in gameServer.clients) {
      var client = gameServer.clients[clientId];
      for (var i = 0; i < client.playerTracker.cells.length; i++) {
        var cell = client.playerTracker.cells[i];
        cell.mass += 130;
      }
    }

  }, 1000);
};

Commands.list.otobasdurdur = function(gameServer) {
  clearInterval(gameServer.intervalId);



  say(gameServer, ["Otomatik-büyüme admin tarafından durduruldu!"]);
};




// otobas end //




// id ile bilgi görüntüleme  start 

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


// id ile bilgi görüntüleme  end


