class Darstellung{

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
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
        reader.readAsText(file);
    }

    drawRoom(room, table, players)
    {
        // Draw room
        var rowHeight = this.height / room.height;
        var colWidth = this.width / room.width;

        this.context.clearRect(0, 0, this.width, this.height);

        //Draw horizontal grid
        for(var i = 1; i < room.height; i++)
        {
            this.context.moveTo(0, i * rowHeight);
            this.context.lineTo(this.canvas.width, i * rowHeight);
            this.context.stroke();
        }

        //Draw vertical grid
        for(i = 1; i < room.width; i++)
        {
            this.context.moveTo(i * colWidth, 0);
            this.context.lineTo(i * colWidth, this.canvas.height);
            this.context.stroke();
        }

        // Draw table
        this.context.fillStyle = "#663300";
        this.context.fillRect(table.xPos * colWidth, table.yPos * rowHeight, table.width * colWidth, table.height * rowHeight);

        // Draw players
        this.context.font = rowHeight + "px Arial";
        this.context.fillStyle = "#000000";
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            this.context.fillText(player.short, player.xPos * colWidth, player.yPos * rowHeight + rowHeight, colWidth);
        }
    }

    drawStatistics(players, statistik)
    {
        var table = document.getElementById("avgHappiness");
        table.innerHTML = "";
        var element;
        var text;

        var tableRow = document.createElement("tr");
        element = document.createElement("th");
        element.setAttribute("scope", "col");
        text = document.createTextNode("Name");
        element.appendChild(text);
        tableRow.appendChild(element);
        for(var i = 0; i < players.length; i++)
        {
            element = document.createElement("th");
            element.setAttribute("scope", "col");
            text = document.createTextNode(players[i].name);
            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);

        tableRow = document.createElement("tr");
        element = document.createElement("td");
        element.setAttribute("scope", "row");
        text = document.createTextNode("Fröhlichkeit ∅");
        element.appendChild(text);
        tableRow.appendChild(element);
        for(i = 0; i < players.length; i++)
        {
            element = document.createElement("td");

            var avgHappiness = statistik.avgHappiness(players[i]);
            var avgHappinessText;
            if (avgHappiness == undefined) {
                avgHappinessText = "-";
            } else {
                avgHappinessText = avgHappiness.toFixed(2);
            }
            text = document.createTextNode(avgHappinessText);

            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);

        tableRow = document.createElement("tr");
        element = document.createElement("td");
        element.setAttribute("scope", "row");
        text = document.createTextNode("Fröhlichkeit");
        element.appendChild(text);
        tableRow.appendChild(element);
        for(i = 0; i < players.length; i++)
        {
            element = document.createElement("td");
            text = document.createTextNode(players[i].happiness.toFixed(2));
            element.appendChild(text);
            tableRow.appendChild(element);
        }
        table.appendChild(tableRow);
    }

    updatePartyIndex(partyIndex)
    {
        var partyIndexText;
        if (partyIndex == undefined) {
            partyIndexText = "-";
        } else {
            partyIndexText = partyIndex.toFixed(1);
        }
        document.getElementById("partyindex").innerText = "Partyindex: " + partyIndexText;
    }
}
