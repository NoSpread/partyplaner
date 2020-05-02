class Statistics {
    constructor() {
        this.happinessLog = {};
    }

    avgHappiness(player) {
        var happiness = getHappiness(player);
        if (!player in this.happinessLog) {
            this.happinessLog[player] = [];
        }
        this.happinessLog[player].push(happiness);

        return happiness;
    }

    partyindex() {
        var avg = 0;
        for (var guest in this.happinessLog) {
            var guestAvg = 0;
            for (var j = 0; j < this.happinessLog[guest].length; j++) {
                guestAvg += this.happinessLog[guest][j];
            }
            guestAvg /= this.happinessLog[guest].length;
            avg += guestAvg;
        }
        avg /= Object.keys(this.happinessLog).length ** 2;

        var threshold = 10; // this avg would yield a score of 0.5

        var partyindex = 1 / (1 + (avg / threshold) ** 2); // nice bellcurve :D

        return partyindex;
    }
}
