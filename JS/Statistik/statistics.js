function partyindex(guestlist) {
    var avg = 0;
    for (var i = 0; i < guestlist.length; i++) {
        var guest = guestlist[i];
        var guestAvg = 0;
        for (var j = 0; j < guest.happiness.length; j++) {
            guestAvg += guest.happiness[j];
        }
        guestAvg /= guest.happiness.length;
        avg += guestAvg;
    }
    avg /= guestlist.length ** 2;

    var threshold = 10; // this avg would yield a score of 0.5

    var partyindex = 1 / (1 + (avg / threshold) ** 2); // nice bellcurve :D

    return partyindex;
}
