$('input[type=radio][name=PlayerGameFilter]').change(function () {
    var playerGameFilter = $(this).val();
    var restoreBannedUserGameFilter = document.getElementById('RestoreBannedUserGame').checked;

    if (playerGameFilter != null && playerGameFilter != '' && restoreBannedUserGameFilter != null) {

        $.getJSON(tseApp.Urls.getPlayerGameUrl, { playerGame: playerGameFilter, restoreBannedUserGame: restoreBannedUserGameFilter }, function (result) {
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

$('#RestoreBannedUserGame').change(function () {
    var restoreBannedUserGameFilter = document.getElementById('RestoreBannedUserGame').checked;
    var playerGameFilter = $('input[type=radio][name=PlayerGameFilter]').val();

    if (restoreBannedUserGameFilter != null && playerGameFilter != null && playerGameFilter != '') {

        $.getJSON(tseApp.Urls.getPlayerGameUrl, { playerGame: playerGameFilter, restoreBannedUserGame: restoreBannedUserGameFilter }, function (result) {
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