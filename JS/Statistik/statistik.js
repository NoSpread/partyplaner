class Statistik {
    constructor() {
        this.happinessLog = {};
    }

    avgHappiness(player) {
        if (!(player.name in this.happinessLog)) {
            this.happinessLog[player.name] = [];
        }
        this.happinessLog[player.name].push(player.happiness);

        var avg = 0;
        for (var i = 0; i < this.happinessLog[player.name].length; i++) {
            avg += this.happinessLog[player.name][i];
        }
        avg /= this.happinessLog[player.name].length;

        return avg;
    }

    partyindex() {
        var avg = 0;
        for (var name in this.happinessLog) {
            var playerAvg = 0;
            for (var i = 0; i < this.happinessLog[name].length; i++) {
                playerAvg += this.happinessLog[name][i];
            }
            playerAvg /= this.happinessLog[name].length;
            avg += playerAvg;
        }
        avg /= Object.keys(this.happinessLog).length ** 2;

        var threshold = 10; // this avg would yield a score of 0.5

        var partyindex = 1 / (1 + (avg / threshold) ** 2); // nice bellcurve :D

        return partyindex;
    }
}
