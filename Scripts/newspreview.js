    $('#btnPreview').click(function () {
        var currentTitle = $('#postTitle').val();
        var currentAuthorDate = $('#postAuthor').text();
        var currentNewsText = $('#postText').val();
        currentNewsText = currentNewsText.replace(/\n/g, "<br />");
        var currentNewsHtml = $.parseHTML(currentNewsText);
        var editAuthorDate = $('#editAuthor').text();

        $('#userDatePreview').text(currentAuthorDate);
        $('#titlePreview').text(currentTitle);
        $('#postTextPreview').html(currentNewsHtml);
        $('#editPreview').text(editAuthorDate);
        $('#newsPreviewContent').show();
        
    });