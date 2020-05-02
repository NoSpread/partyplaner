function appendPlayer(){
    var player = document.createElement("div");
    var element = document.createElement("label");
    var text = document.createTextNode("Spieler");
    element.appendChild(text);
    player.appendChild(element);


    document.getElementById("players").appendChild(player);
}

//document.getElementById("addPlayer").addEventListener("click", appendPlayer);
document.getElementById("addPlayer").addEventListener("click", alert("cvbc"));