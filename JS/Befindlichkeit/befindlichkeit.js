class Befindlichkeit {
	function constructor(game) {
		this.game = game;
		this.players = this.game.players;
	}


	function updatePosition(playershort) {
		var player;
		for(playerx in this.players) {
			if((playerx.short == playershort) {
				player = playerx;
				break;
			}
		}

		var happiness;
		var i = 0, maxHappiness=0;
		var playerNew;

		clone(playerNew, player);
		for(playerNew.xPos = player.xPos-1; playerNew.xPos <= player.xPos+1;playerNew.xPos++) {
			for(playerNew.yPos = player.yPos-1; playerNew.yPos <= player.yPos+1; playerNew.yPos++) {
				if(isValid(playerNew, global)) {
					happiness[i] = {playerNew.xPos, 
							playerNew.yPos, 
							getHappiness(playerNew, global)};
					
					if(happiness[maxHappiness] > happiness[i]) {
						maxHappiness = i;
					}
					i++;
				}
			}
		}
		playerNew.xPos(happiness[maxHappiness][0]);
		playerNew.yPos(happiness[maxHappiness[1]);
		playerNew.happiness(happiness[maxHappiness][2]);
		player = playerNew;
	}

	function isValid(playerNew, global) {
		if(playerNew.xPos < 0 || playerNew.xPos >= global.Room.width || 
		   playerNew.yPos < 0 || playerNew.yPos >= global.Room.heigth) //Player out of bounds
			return false;
		
		if(playerNew.xPos >= global.Table.xPos && playerNew.xPos <= global.Table.xPos + global.Table.width &&
		   playerNew.yPos >= global.Table.yPos && playerNew.yPos <= global.Table.yPos + global.Table.heigth) // Player on Table
			return false;

		for(player in global.players) {
			if(player.name != playerNew.name) {
				if(player.xPos == playerNew.xPos && player.yPos == playerNew.yPos)
					return false;
				}
		}
		return true;
	}
	
	function getHappiness(playerNew, global) {
		var happiness = 0;
		for(player in global.players) {
			if(player.name != playerNew.name) {
				var distance = Math.sqrt(Math.pow(playerNew.xPos - player.xPos, 2) + Math.pow(playerNew.yPos - player.yPos, 2));
				happiness += Math.abs(distance - playerNew.distances[player.name]); 		//mag Fehler schmeißen distances[player] vllt
			}
		}
		var table;
		if(playerNew.xPos < global.Table.xPos) {	//X Position 
			table[0] = global.Table.xPos;
		} else if(playerNew.xPos > global.Table.xPos + global.Table.width ) {
			table[0] = global.Table.xPos + global.Table.width;
		} else {
			table[0] = playerNew.xPos;
		}
		if(playerNew.yPos < global.Table.yPos) {	//Y Position 
			table[1] = global.Table.yPos;
		} else if(playerNew.yPos > global.Table.yPos + global.Table.heigth ) {
			table[1] = global.Table.yPos + global.Table.heigth;
		} else {
			table[1] = playerNew.yPos;
		}
		var distance = Math.sqrt(Math.pow(playerNew.xPos - table[0], 2) + Math.pow(playerNew.yPos - table[1], 2));
		happiness += Math.abs(distance - playerNew.distances[global.table]);
		return happiness;
	}

	function clone(playerNew, player) {
		playerNew.name = player.name;
		playerNew.short = player.short;
		playerNew.job = player.job;
		playerNew.happiness = player.happiness;
		playerNew.distances = player.distances;
		playerNew.xPos = player.xPos;
		playerNew.yPos = player.yPos;
	}

}
