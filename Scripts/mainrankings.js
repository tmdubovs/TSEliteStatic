$(document).ready(function () {

    function CalculateStoryTime() {
        var gameId = $("#GameId").val();

        if (gameId !== "1" && gameId !== "3" && gameId !== "4") {
            return;
        }

        var easyStages = [];
        var normalStages = [];
        var hardStages = [];
        if (gameId === "1") {
            easyStages = [1, 4, 7, 10, 13, 16, 19, 22, 25];
            normalStages = [2, 5, 8, 11, 14, 17, 20, 23, 26];
            hardStages = [3, 6, 9, 12, 15, 18, 21, 24, 27];
        }

        if (gameId === "4") {
            easyStages = [213, 216, 219, 222, 225, 228, 231, 234, 237, 240];
            normalStages = [214, 217, 220, 223, 226, 229, 232, 235, 238, 241];
            hardStages = [215, 218, 221, 224, 227, 230, 233, 236, 239, 242];
        }

        if (gameId === "3") {
            easyStages = [126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162];
            normalStages = [127, 130, 133, 136, 139, 142, 145, 148, 151, 154, 157, 160, 163];
            hardStages = [128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164];
        }

        var easySeconds = 0;
        var easyTenths = 0;
        var normalSeconds = 0;
        var normalTenths = 0;
        var hardSeconds = 0;
        var hardTenths = 0;
        var totalSeconds = 0;
        var totalTenths = 0;

        var i;
        var stageTime = "";
        var convertResult;

        for (i = 0; i < easyStages.length; i++) {
            stageTime = $("#Stage_" + easyStages[i].toString()).text().trim();
            convertResult = ConvertToSeconds(stageTime);
            easySeconds = easySeconds + parseInt(convertResult[0]);
            easyTenths = easyTenths + parseInt(convertResult[1]);
        }

        for (i = 0; i < normalStages.length; i++) {
            stageTime = $("#Stage_" + normalStages[i].toString()).text().trim();
            convertResult = ConvertToSeconds(stageTime);
            normalSeconds = normalSeconds + parseInt(convertResult[0]);
            normalTenths = normalTenths + parseInt(convertResult[1]);
        }

        for (i = 0; i < hardStages.length; i++) {
            stageTime = $("#Stage_" + hardStages[i].toString()).text().trim();
            convertResult = ConvertToSeconds(stageTime);
            hardSeconds = hardSeconds + parseInt(convertResult[0]);
            hardTenths = hardTenths + parseInt(convertResult[1]);
        }

        totalSeconds = easySeconds + normalSeconds + hardSeconds;
        totalTenths = easyTenths + normalTenths + hardTenths;

        easySeconds = easySeconds + parseInt(easyTenths / 10);
        easyTenths = easyTenths - parseInt(easyTenths / 10) * 10;
        var easyMinutes = parseInt(easySeconds / 60);
        easySeconds = easySeconds - easyMinutes * 60;
        var easyHours = parseInt(easyMinutes / 60);
        easyMinutes = easyMinutes - easyHours * 60;
        if (easySeconds < 10) {
            easyTime = easyMinutes.toString() + ":0" + easySeconds.toString();
        }
        else {
            easyTime = easyMinutes.toString() + ":" + easySeconds.toString();
        }

        normalSeconds = normalSeconds + parseInt(normalTenths / 10);
        normalTenths = normalTenths - parseInt(normalTenths / 10) * 10;
        var normalMinutes = parseInt(normalSeconds / 60);
        normalSeconds = normalSeconds - normalMinutes * 60;
        var normalHours = parseInt(normalMinutes / 60);
        normalMinutes = normalMinutes - normalHours * 60;
        if (normalSeconds < 10) {
            normalTime = normalMinutes.toString() + ":0" + normalSeconds.toString();
        }
        else {
            normalTime = normalMinutes.toString() + ":" + normalSeconds.toString();
        }
        
        hardSeconds = hardSeconds + parseInt(hardTenths / 10);
        hardTenths = hardTenths - parseInt(hardTenths / 10) * 10;
        var hardMinutes = parseInt(hardSeconds / 60);
        hardSeconds = hardSeconds - hardMinutes * 60;
        var hardHours = parseInt(hardMinutes / 60);
        hardMinutes = hardMinutes - hardHours * 60;
        if (hardSeconds < 10) {
            hardTime = hardMinutes.toString() + ":0" + hardSeconds.toString();
        }
        else {
            hardTime = hardMinutes.toString() + ":" + hardSeconds.toString();
        }

        totalSeconds = totalSeconds + parseInt(totalTenths / 10);
        totalTenths = totalTenths - parseInt(totalTenths / 10) * 10;
        var totalMinutes = parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds - totalMinutes * 60;
        var totalHours = parseInt(totalMinutes / 60);
        totalMinutes = totalMinutes - totalHours * 60;
        if (totalSeconds < 10) {
            totalTime = totalMinutes.toString() + ":0" + totalSeconds.toString();
        }
        else {
            totalTime = totalMinutes.toString() + ":" + totalSeconds.toString();
        }
        

        if (gameId !== "4") {
            easyTime = easyTime + "." + easyTenths.toString();
            normalTime = normalTime + "." + normalTenths.toString();
            hardTime = hardTime + "." + hardTenths.toString();
            totalTime = totalTime + "." + totalTenths.toString();
        }

        if (easyHours > 0) {
            if (easyMinutes >= 10) {
                easyTime = easyHours.toString() + ":" + easyTime;
            }
            else {
                easyTime = easyHours.toString() + ":0" + easyTime;
            }
        }

        if (normalHours > 0) {
            if (normalMinutes >= 10) {
                normalTime = normalHours.toString() + ":" + normalTime;
            }
            else {
                normalTime = normalHours.toString() + ":0" + normalTime;
            }
        }

        if (hardHours > 0) {
            if (hardMinutes >= 10) {
                hardTime = hardHours.toString() + ":" + hardTime;
            }
            else {
                hardTime = hardHours.toString() + ":0" + hardTime;
            }
        }

        if (totalHours > 0) {
            if (totalMinutes > 10) {
                totalTime = totalHours.toString() + ":" + totalTime;
            }
            else {
                totalTime = totalHours.toString() + ":0" + totalTime;
            }
        }

        $("#easy_time_total").text(easyTime);
        $("#normal_time_total").text(normalTime);
        $("#hard_time_total").text(hardTime);
        $("#story_time_total").text(totalTime);
    }

    function ConvertToSeconds(score) {
        var scoreSplit = score.split(":");
        var secondsSplit = scoreSplit[1].split(".");
        var minutes = parseInt(scoreSplit[0] * 60) + parseInt(secondsSplit[0]);
        if (secondsSplit.length > 1) {
            return [minutes.toString(), secondsSplit[1]];
        }
        else {
            return [minutes.toString(), "0"];
        }
    }

    CalculateStoryTime();

});