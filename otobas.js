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


