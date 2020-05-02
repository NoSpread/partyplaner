class Befindlichkeit {
	constructor(game) {
		this.game = game;
		this.players = this.game.players;
		console.log("Befindlichkeit:constructor()");
	}


	updatePosition(playershort) {
		console.log("Befindlichkeit:updatePosition(" + playershort + ")");
		var player;


		for(var s = 0; s < this.players.length; s++) {
			if(this.players[s].short == playershort) {
				player = this.players[s];
				break;
			}
		}
		console.log("Befindlichkeit:updatePosition(" + playershort + ")=" + player.name);

		var happiness = new Array();
		var i = 0, maxHappiness=0;
		var playerNew = new Array();

		this.clonen(playerNew, player);
		for(playerNew.xPos = player.xPos-1; playerNew.xPos <= player.xPos+1;playerNew.xPos++) {
			for(playerNew.yPos = player.yPos-1; playerNew.yPos <= player.yPos+1; playerNew.yPos++) {
				if(this.isValid(playerNew)) {
					happiness[i] = [playerNew.xPos, 
							playerNew.yPos, 
							this.getHappiness(playerNew)];
					
					if(happiness[maxHappiness] > happiness[i]) {
						maxHappiness = i;
					}
					i++;
				}
			}
		}
		playerNew.xPos = happiness[maxHappiness][0];
		playerNew.yPos = happiness[maxHappiness][1];
		playerNew.happiness = happiness[maxHappiness][2];
		player = playerNew;
	}

	isValid(playerNew) {
		if(playerNew.xPos < 0 || playerNew.xPos >= this.game.room.width || 
		   playerNew.yPos < 0 || playerNew.yPos >= this.game.room.heigth) //Player out of bounds
			return false;
		
		if(playerNew.xPos >= this.game.table.xPos && playerNew.xPos <= this.game.table.xPos + this.game.table.width &&
		   playerNew.yPos >= this.game.table.yPos && playerNew.yPos <= this.game.table.yPos + this.game.table.heigth) // Player on table
			return false;

		for(var player in this.game.players) {
			if(player.name != playerNew.name) {
				if(player.xPos == playerNew.xPos && player.yPos == playerNew.yPos)
					return false;
				}
		}
		return true;
	}
	
	getHappiness(playerNew) {
		var happiness = 0;
		for(var player in this.game.players) {
			if(player.name != playerNew.name) {
				var distance = Math.sqrt(Math.pow(playerNew.xPos - player.xPos, 2) + Math.pow(playerNew.yPos - player.yPos, 2));
				happiness += Math.abs(distance - playerNew.distances[player.name]); 		//mag Fehler schmeißen distances[player] vllt
			}
		}
		var table = new Array();
		if(playerNew.xPos < this.game.table.xPos) {	//X Position 
			table[0] = this.game.table.xPos;
		} else if(playerNew.xPos > this.game.table.xPos + this.game.table.width ) {
			table[0] = this.game.table.xPos + this.game.table.width;
		} else {
			table[0] = playerNew.xPos;
		}
		if(playerNew.yPos < this.game.table.yPos) {	//Y Position 
			table[1] = this.game.table.yPos;
		} else if(playerNew.yPos > this.game.table.yPos + this.game.table.heigth ) {
			table[1] = this.game.table.yPos + this.game.table.heigth;
		} else {
			table[1] = playerNew.yPos;
		}
		var distance = Math.sqrt(Math.pow(playerNew.xPos - table[0], 2) + Math.pow(playerNew.yPos - table[1], 2));
		happiness += Math.abs(distance - playerNew.distances[this.game.table]);
		return happiness;
	}

	clonen(playerNew, player) {
		console.log("Befindlichkeit:Cloning()");
		playerNew.name = player.name;
		playerNew.short = player.short;
		playerNew.job = player.job;
		playerNew.happiness = player.happiness;
		playerNew.distances = player.distances;
		playerNew.xPos = player.xPos;
		playerNew.yPos = player.yPos;
	}
}
