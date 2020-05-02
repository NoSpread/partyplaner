function importFile(inputText) {
    var data = JSON.parse(inputText);
    return data;
}

function exportJSON(data) {
    name = name || "spielDaten.json";
    type = type || "text/plain";
    var element = document.createElement('a');
    var file = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
    });
    element.href = URL.createObjectURL(file);
    element.download = name;
    element.click();
}
