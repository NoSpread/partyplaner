class Befindlichkeit {
	constructor(game) {
		this.game = game;
		this.players = this.game.players;
	}


	updatePosition(playershort) {
		var player;
		console.log("Befindlichkeit:updatePosition(" + playershort + ")");

		for(var s = 0; s < this.players.length; s++) {
			if(this.players[s].short == playershort) {
				player = this.players[s];
				break;
			}
		}

		var happiness = new Array();
		var i = 0, maxHappiness = 0;
		var playerNew = new Array();

		this.clone(playerNew, player);
		for(playerNew.xPos = player.xPos-1; playerNew.xPos <= player.xPos+1;playerNew.xPos++) {
			for(playerNew.yPos = player.yPos-1; playerNew.yPos <= player.yPos+1; playerNew.yPos++) {
				if(this.isValid(playerNew)) {
					happiness[i] = [playerNew.xPos, 
							playerNew.yPos, 
							this.getHappiness(playerNew)];
					
					if(happiness[maxHappiness][2] > happiness[i][2]) {
						maxHappiness = i;
					}
					i++;
				}
			}
		}
		player.xPos = happiness[maxHappiness][0];
		player.yPos = happiness[maxHappiness][1];
		player.happiness = happiness[maxHappiness][2];
		console.log("Befindlichkeit:updatePosition():New Position: (" + player.xPos + ", " + player.yPos + "):" + player.happiness);
	}

	isValid(playerNew) {
		if(playerNew.xPos < 0 || playerNew.xPos >= this.game.room.width || playerNew.yPos < 0 || playerNew.yPos >= this.game.room.height) {
			return false;
		}
		if(playerNew.xPos >= this.game.table.xPos && playerNew.xPos < this.game.table.xPos + this.game.table.width &&
		   playerNew.yPos >= this.game.table.yPos && playerNew.yPos < this.game.table.yPos + this.game.table.height) // Player on table
			return false;

		for(var s = 0; s < this.players.length; s++) {
			if(this.players[s].name != playerNew.name) {
				if(this.players[s].xPos == playerNew.xPos && this.players[s].yPos == playerNew.yPos)
					return false;
				}
		}

		console.log("(" + playerNew.xPos + ", " + playerNew.yPos + ")"); 
		return true;
	}
	
	getHappiness(playerNew) {
		var happiness = 0.00;
		var player = this.players;

		for(var s = 0; s < player.length; s++) {
			if(player[s].name != playerNew.name) {
				var distance = Math.sqrt(Math.pow(playerNew.xPos - player[s].xPos, 2) + Math.pow(playerNew.yPos - player[s].yPos, 2));
				happiness += Math.abs(distance - playerNew.distances[player[s].short]); 		//mag Fehler schmeißen distances[player] vllt
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
		} else if(playerNew.yPos > this.game.table.yPos + this.game.table.height ) {
			table[1] = this.game.table.yPos + this.game.table.height;
		} else {
			table[1] = playerNew.yPos;
		}
		var distance = Math.sqrt(Math.pow(playerNew.xPos - table[0], 2) + Math.pow(playerNew.yPos - table[1], 2));

		happiness += Math.abs(distance - playerNew.distances["Table"]);
		return happiness;
	}

	clone(playerNew, player) {
		playerNew.name = player.name;
		playerNew.short = player.short;
		playerNew.job = player.job;
		playerNew.happiness = player.happiness;
		playerNew.distances = player.distances;
		playerNew.xPos = player.xPos;
		playerNew.yPos = player.yPos;
	}
}
