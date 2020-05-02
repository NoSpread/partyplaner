class Steuerung{

  extractShortNames(){
    this.shortNames = new Array();
    for(var i = 0; i < this.game.players.length; i++)
    {
      this.shortNames.push(this.game.players[i].short);
    }
    this.currentPlayer = 0;
  }

  constructor(){
    this.players = new Array();
    this.darstellung = new Darstellung(this);
    //this.konfiguration = new Konfiguration();
    this.simulationSpeed = 0;
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
    this.exportJSON(game);
  }

  calculatePlayer(shortName){
    this.befindlichkeit.updatePosition(shortName);
    // New position and happiness is automaticaly updated in game object.
    this.darstellung.drawRoom(this.game.room);
    this.darstellung.drawTable(this.game.table);
    this.darstellung.drawPlayers(this.game.players);

    this.darstellung.updatePartyIndex(this.statistik.partyIndex());
    this.darstellung.drawStatistics(this.game.players);
  }

  calculateCurrentPlayer(){
    this.calculatePlayer(this.shortNames[this.currentPlayer]);
    this.nextPlayer();
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
    if(speed > 0 && this.simulationSpeed == 0){
      setTimeout(this.simulate(), 0);
    }
    this.simulationSpeed = speed;
  }

  simulate(){
    console.log("test");
    if(this.simulationSpeed > 0)this.calculateCurrentPlayer();
    if(this.simulationSpeed > 0){
      setTimeout(this.simulate, 1000 - 100*this.simulationSpeed);
    }
  }
}
