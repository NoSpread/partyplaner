class Darstellung{

    constructor() {
        window.canvas = document.getElementById("canvas");
        window.context = window.canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
    }

    /*makeJsonFromInput()
    {

    }*/

    readFile() {
        var file = document.getElementById("import").files[0]; 
        var reader = new FileReader();
        reader.onload = function(e){
            steuerung.importFile(e.target.result);
        };
        reader.readAsText(file)
    }

    drawRoom(room)
    {
        window.context.clearRect(0, 0, this.width, this.height);
        window.vPitch = this.height / room.height;
        window.hPitch = this.width / room.width;

        //Draw horizontal grid
        for(var i = 1; i < room.height; i++)
        {
            window.context.moveTo(0, i * window.vPitch);
            window.context.lineTo(canvas.width, i * window.vPitch);
            window.context.stroke();
        }

        //Draw vertical grid
        for(i = 1; i < room.width; i++)
        {
            window.context.moveTo(i * window.hPitch, 0);
            window.context.lineTo(i * window.hPitch, canvas.height);
            window.context.stroke();
        }
    }  

    drawTable(table)
    {
        window.context.fillStyle = "#663300";
        window.context.fillRect(table.xPos * window.hPitch, table.yPos * window.vPitch, table.width * window.hPitch, table.height * window.vPitch);
    }

    drawPlayers(players)
    {
        window.context.font = window.vPitch + "px Arial";
        window.context.fillStyle = "#000000";
        players.forEach(drawPlayer);
        function drawPlayer(player)
        {
            window.context.fillText(player.short, player.xPos * window.hPitch, player.yPos * window.vPitch + window.vPitch, window.hPitch);
        }
    }
    
    drawStatistics(players, statistik)
    {
        var table = document.getElementById("avgHappiness")
        table.innerHTML = "";
        var element;
        var text;

        var tableRow = document.createElement("tr")
        for(var i = 0; i < players.length; i++)
        {  
            element = document.createElement("th");
            text = document.createTextNode(players[i].name);
            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);

        tableRow = document.createElement("tr")
        for(i = 0; i < players.length; i++)
        {  
            element = document.createElement("td");
            text = document.createTextNode(statistik.avgHappiness(players[i]));
            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);
        
        tableRow = document.createElement("tr")
        for(i = 0; i < players.length; i++)
        {  
            element = document.createElement("td");
            text = document.createTextNode(players[i].happiness);
            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);
    }

    updatePartyIndex(partyIndex)
    {
        document.getElementById("partyindex").innerText = partyIndex;
    }
}
