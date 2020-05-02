class Steuerung{

  extractShortNames(){
    this.shortNames = new Array();
    this.game.players.forEach(function(item){ this.shortNames.push(item.short); });
    this.currentPlayer = 0;
  }

  constructor(){
    this.players = new Array();
    this.darstellung = new Darstellung(this);
    //this.konfiguration = new Konfiguration();
    this.simulationSpeed = 0;
    this.simulate();
  }

  importFile(file){
    this.game = importJSON(file);
    // if(konfiguration.validate(this.game)){
    this.extractShortNames();
    this.befindlichkeit = new Befindlichkeit(this.game);
    this.statistik = new Statistik();
    return true;
    // }else{
    // return false;
    // }
  }

  exportFile(){
    exportJSON(game);
  }

  calculatePlayer(shortName){
    this.befindlichkeit.updatePosition(shortName);
    // New position and happiness is automaticaly updated in game object.
    this.darstellung.drawRoom(this.game.room);
    this.darstellung.drawTable(this.game.table);
    this.darstellung.drawPlayers(this.game.players);

    this.darstellung.updatePartyIndex(this.statistik.partyIndex());
    this.darstellung.drawStatistics(players);
  }

  calculateCurrentPlayer(){
    calculatePlayer(this.shortNames[this.currentPlayer]);
    nextPlayer();
  }

  nextPlayer(){
    this.currentPlayer = (this.currentPlayer + 1) % this.shortNames.count;
  }

  setSimulationSpeed(speed){
    if(speed > 8){
      speed = 8;
    }else if(speed < 0){
      speed = 0;
    }
    this.simulationSpeed = speed;
  }

  simulate(){
    while(this.simulationSpeed > 0){
      setTimeout(calculateCurrentPlayer(), 100*(10-this.simulationSpeed));
    }
  }
}
