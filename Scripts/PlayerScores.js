//Orignal version of this script by Ryan Dwyer for the-elite.net
//It's been modified into jquery and to be compatible with the TSElite scorepages by Tim Dubovsky.

function getHighlightMode() {
    var pos = document.cookie.indexOf('highlight_mode');

    if (pos == -1) {
        return 'off';
    }

    var value = document.cookie.substr(pos + 15);

    value = value.substr(0, 3);

    if (value == 'wrs' || value == 'hit') {
        return value;
    } else {
        return 'off';
    }
}

function highlightScores() {
    // Remove active states on buttons
    var lis = $("#highlight-controls").children().removeClass('active');

    // Add active state
    var mode = getHighlightMode();

    $("#highlight-control-" + mode).addClass('active');

    // Process highlighting
    if (mode == 'wrs') {
        highlightRecords();
    }

    if (mode == 'hit') {
        highlightHitList();
    }

    if (mode == 'off') {
        highlightOff();
    }
}

function highlightOff() {
    $(".scorecell.td_wr").css("background-color", "");
}

function highlightRecords() {
    highlightOff();
    $(".scorecell.td_wr.rank1").css("background-color", "#0099FF");
}

function highlightHitList() {
    var scores = [];

    // Get rank from class attributes and store it
    var cells = $(".scorecell.td_wr");

    for (var i = 0; i < cells.length; i++) {
        var realRank = 0;
        var classes = cells[i].className.split(' ');

        for (var j = 0; j < classes.length; j++) {
            if (classes[j].indexOf('rank') == 0) {
                realRank = classes[j].replace('rank', '') * 1;
            }
        }

        scores.push({
            indexedRank: null,
            realRank: realRank,
            elem: cells[i]
        });
    }

    // Sort times in order of rank
    scores.sort(function (a, b) {
        if (a.realRank < b.realRank) {
            return -1;
        } else if (a.realRank > b.realRank) {
            return 1;
        } else {
            return 0;
        }
    });

    // Now, calculate their indexed rank and color the cell
    var last_real_rank = 0;
    var last_indexed_rank = 0;

    for (i = 0; i < scores.length; i++) {
        if (scores[i].realRank != last_real_rank) {
            last_indexed_rank = i + 1;
            last_real_rank = scores[i].realRank;
        }

        var percentage = last_indexed_rank / scores.length;
        var color = 0;
        if (percentage > 0.5) {
            color = 75 << 16;
            color += Math.round((1 - percentage) * 150) << 8;
            color += Math.round((1 - percentage) * 150);
        } else {
            color = Math.round((percentage) * 150) << 16;
            color += 75 << 8;
            color += Math.round((percentage) * 150);
        }

        color = color.toString(16);
        color = '000000'.substr(color.length) + color;

        scores[i].elem.style.backgroundColor = '#' + color;
    }
}

function setHighlight(mode) {
    document.cookie = 'highlight_mode=' + mode + ';max-age=9999999;path=/';
    highlightScores();
}
