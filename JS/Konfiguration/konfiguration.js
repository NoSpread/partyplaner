class Konfiguration {
    constructor() {
        this.config = {};
    }

    checkGueltigkeit(type, config) {
        switch(type) {
            case "table": {
                if(typeof config != 'object')
                    return false;
                let requiredAttributes = {
                    "xPos": "number",
                    "yPos": "number",
                    "height": "number",
                    "width": "number"
                }
                if(!Object.keys(requiredAttributes).every(attr => typeof config[attr] == requiredAttributes[attr]))
                    return false;
                if(table.height < 0 || table.width < 0 || table.xPos < 0 || table.yPos < 0)
                    return false;
                return true;
            }
            case "room": {
                if(typeof config != 'object')
                    return false;
                let requiredAttributes = {
                    "height": "number",
                    "width": "number"
                }
                if(!Object.keys(requiredAttributes).every(attr => typeof config[attr] == requiredAttributes[attr]))
                    return false;
                return true;
            }
            case "players": {
                if(!Array.isArray(config))
                    return false;
                let requiredAttributes = {
                    "name": "string",
                    "job": "string",
                    "short": "string",
                    "happiness": "number",
                    "xPos": "number",
                    "yPos": "number",
                    "distances": "object"
                }
                config.forEach(player => {
                    if(!Object.keys(requiredAttributes).every(attr => typeof player[attr] == requiredAttributes[attr]))
                        return false;
                    if(!player.distances.hasOwnProperty("Table") && typeof player.distances.Table == 'string')
                        return false;
                });
                return true;
            }
            default: {
                return false; // hmmmm was ist denn das?? 🤔
            }
        }
    }

    validate(data) {
        if(!Object.keys(data).every(type => this.checkGueltigkeit(type, data[type])))
            return false;
        return false;
    }

    setCurrentConfig(config) {
        if(typeof config != 'object')
            return false;
        Object.keys(config).forEach(type => this.config[type] = config[type]);
        if(!Object.keys(config).every(type => this.checkGueltigkeit(type, config[type])))
            return false;
        return true;
    }

    getCurrentConfig() {
        return this.config;
    }

    getCurrentConfigPart(part) {
        return (this.config[part] || null);
    }
}