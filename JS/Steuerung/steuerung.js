// Currently undefined interfaces are represented with ………()

class Steuerung{

  function extractShortNames(){
    this.shortNames = new Array();
    this.game.players.forEach(function(item){ this.shortNames.push(item.short); });
    this.currentPlayer = 0;
  }

  function constructor(){
    this.players = new Array();
    this.darstellung = new Darstellung(this);
    this.konfiguration = new Konfiguration();
    this.simulationSpeed = 0;
    simulate();
  }

  function importFile(file){
    this.game = importJSON(file);
    konfiguration.validate(this.game);
    extractShortNames();
    this.befindlichkeit = new Befindlichkeit(this.game);
    this.statistik = new Statistik(this.game);
  }

  function exportFile(){
    exportJSON(game);
  }

  function calculatePlayer(shortName){
    this.befindlichkeit.………(shortName);
    // New position and happiness is automaticaly updated in game object.
    this.darstellung.drawRoom(this.game.room);
    this.darstellung.drawTable(this.game.table);
    this.darstellung.drawPlayers(this.game.players);

    this.darstellung.updatePartyIndex(this.statistik.………());
    this.darstellung.drawStatistics(players);
  }

  function calculateCurrentPlayer(){
    calculatePlayer(this.shortNames[this.currentPlayer]);
    nextPlayer();
  }

  function nextPlayer(){
    this.currentPlayer = (this.currentPlayer + 1) % this.shortNames.count;
  }

  function setSimulationSpeed(speed){
    if(speed > 8){
      speed = 8;
    }elseif(speed < 0){
      speed = 0;
    }
    this.simulationSpeed = speed;
  }

  async function simulate(){
    while(this.simulationSpeed > 0){
      calculateCurrentPlayer();
      await new Promise(r => setTimeout(r, 100*(10-this.simulationSpeed));
    }
  }
}
