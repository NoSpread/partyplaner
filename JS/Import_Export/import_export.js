function importJSON(inputText) {
    var data = JSON.parse(inputText);
    return data;
}

function exportJSON(data) {
    data = JSON.stringify(data);
    name = "spielDaten.json";
    type = "application/json";
    var element = document.createElement('a');
    var file = new Blob([data], { type: type });
    element.href = URL.createObjectURL(file);
    element.download = name;
    element.click();
}