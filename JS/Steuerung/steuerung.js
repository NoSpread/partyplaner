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
    this.darstellung = new Darstellung(this);
    this.konfiguration = new Konfiguration();
    this.simulationSpeed = 1;
    this.running = false;
  }

  importFile(file){
    this.simulationSpeed = 1;
    this.game = importJSON(file);
    if(this.konfiguration.setCurrentConfig(this.game)){
      this.extractShortNames();
      this.befindlichkeit = new Befindlichkeit(this.game);
      this.statistik = new Statistik();
      this.darstellung.drawRoom(this.game.room, this.game.table, this.game.players)
      return true;
    }else{
      return false;
    }
  }

  exportFile(){
    exportJSON(this.game);
  }

  calculatePlayer(shortName){
    this.befindlichkeit.updatePosition(shortName);

    for (var i = 0; i < this.game.players.length; i++) {
        if (this.game.players[i].short == shortName) {
            this.statistik.logHappiness(this.game.players[i]);
            break;
        }
    }
    // New position and happiness is automaticaly updated in game object.
    this.darstellung.drawRoom(this.game.room, this.game.table, this.game.players);

    this.darstellung.updatePartyIndex(this.statistik.partyIndex());
    this.darstellung.drawStatistics(this.game.players, this.statistik);
  }

  calculateCurrentPlayer(){
    this.calculatePlayer(this.shortNames[this.currentPlayer]);
    this.nextPlayer();
  }

  nextPlayer(){
    this.currentPlayer = (this.currentPlayer + 1) % this.shortNames.length;
  }

  toggle() {
    this.running = !this.running;
    if (this.running) {
        setTimeout(this.simulate.bind(this), 0);
    }
  }

  setSimulationSpeed(speed){
    this.simulationSpeed = speed;
  }

  simulate(){
    if(this.running){
      this.calculateCurrentPlayer();
      setTimeout(this.simulate.bind(this), 1000 / this.simulationSpeed);
    }
  }
}
