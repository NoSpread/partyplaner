"use strict";

function serialize(object) {
    return JSON.stringify(object);
}


/**
 * 
 * @returns Promise
 * @param {error, data} callback 
 */
function getFile(callback) {
    callback = callback || function() {};

    var element = document.createElement('div');
    element.innerHTML = '<input type="file" accept="text/plain,application/json">';
    var fileInput = element.firstChild;

    return new Promise(function(resolve, reject) {
        fileInput.addEventListener('change', function() {
            var file = fileInput.files[0];

            if (file.name.match(/\.(txt|json)$/)) {
                var reader = new FileReader();
    
                reader.onload = function() {
                    console.log(reader.result);
                };
                var data = reader.readAsText(file);
                callback(null, data);    
                resolve(data);
            } else {
                var err = new Error("Datei ist keine .json oder .txt Datei");
                callback(err);
                reject(err);
            }
        });
        fileInput.click();
    });
}

function saveFile(data, name, type) {
    name = name || "export.txt";
    type = type || "text/plain";
    var element = document.createElement('a');
    var file = new Blob([data], {type: type});
    element.href = URL.createObjectURL(file);
    element.download = name;
    element.click();
}
