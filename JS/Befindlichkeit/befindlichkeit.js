class Befindlichkeit {
	constructor(game) {
		this.game = game;
		this.players = this.game.players;
	}


	updatePosition(playershort) {
		var player;
		for each (var playerx in this.players) {
			if(playerx.short == playershort) {
				player = playerx;
				break;
			}
		}

		var happiness;
		var i = 0, maxHappiness=0;
		var playerNew;

		this.clone(playerNew, player);
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
		if(playerNew.xPos < 0 || playerNew.xPos >= this.game.Room.width || 
		   playerNew.yPos < 0 || playerNew.yPos >= this.game.Room.heigth) //Player out of bounds
			return false;
		
		if(playerNew.xPos >= this.game.Table.xPos && playerNew.xPos <= this.game.Table.xPos + this.game.Table.width &&
		   playerNew.yPos >= this.game.Table.yPos && playerNew.yPos <= this.game.Table.yPos + this.game.Table.heigth) // Player on Table
			return false;

		for each(var player in this.game.players) {
			if(player.name != playerNew.name) {
				if(player.xPos == playerNew.xPos && player.yPos == playerNew.yPos)
					return false;
				}
		}
		return true;
	}
	
	getHappiness(playerNew) {
		var happiness = 0;
		for each(var player in this.game.players) {
			if(player.name != playerNew.name) {
				var distance = Math.sqrt(Math.pow(playerNew.xPos - player.xPos, 2) + Math.pow(playerNew.yPos - player.yPos, 2));
				happiness += Math.abs(distance - playerNew.distances[player.name]); 		//mag Fehler schmeißen distances[player] vllt
			}
		}
		var table;
		if(playerNew.xPos < this.game.Table.xPos) {	//X Position 
			table[0] = this.game.Table.xPos;
		} else if(playerNew.xPos > this.game.Table.xPos + this.game.Table.width ) {
			table[0] = this.game.Table.xPos + this.game.Table.width;
		} else {
			table[0] = playerNew.xPos;
		}
		if(playerNew.yPos < this.game.Table.yPos) {	//Y Position 
			table[1] = this.game.Table.yPos;
		} else if(playerNew.yPos > this.game.Table.yPos + this.game.Table.heigth ) {
			table[1] = this.game.Table.yPos + this.game.Table.heigth;
		} else {
			table[1] = playerNew.yPos;
		}
		var distance = Math.sqrt(Math.pow(playerNew.xPos - table[0], 2) + Math.pow(playerNew.yPos - table[1], 2));
		happiness += Math.abs(distance - playerNew.distances[this.game.table]);
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
