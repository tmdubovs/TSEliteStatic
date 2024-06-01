$('input[type=radio][name=PlayerGameFilter]').change(function () {
    var playerGameFilter = $(this).val();
    var unlockUserGameFilter = document.getElementById('UnlockPlayerScorepage').checked;

    if (playerGameFilter !== null && playerGameFilter !== '' && unlockUserGameFilter !== null) {

        $.getJSON(tseApp.Urls.getPlayerGameUrl, { playerGame: playerGameFilter, restoreBannedUserGame: false, getLockedPlayers: unlockUserGameFilter }, function (result) {
            var playerSelect = $('#SelectedUserId');
            playerSelect.empty();

            $.each(result, function (index, item) {
                playerSelect.append($('<option/>', {
                    value: item.value,
                    text: item.text
                }));
            });
        });
    }
});

$('#UnlockPlayerScorepage').change(function () {
    var unlockUserGameFilter = document.getElementById('UnlockPlayerScorepage').checked;
    var playerGameFilter = $('input[type=radio][name=PlayerGameFilter]').val();

    if (unlockUserGameFilter !== null && playerGameFilter !== null && playerGameFilter !== '') {

        $.getJSON(tseApp.Urls.getPlayerGameUrl, { playerGame: playerGameFilter, restoreBannedUserGame: false, getLockedPlayers: unlockUserGameFilter }, function (result) {
            var playerSelect = $('#SelectedUserId');
            playerSelect.empty();

            $.each(result, function (index, item) {
                playerSelect.append($('<option/>', {
                    value: item.value,
                    text: item.text
                }));
            });
        });
    }
});