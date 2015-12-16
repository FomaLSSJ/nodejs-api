$(document).ready(function() {
    $('body').on('click', 'button#getArt', function() {
        $('#advance').text('');
        $('#advance').append(
            '<button id="showArt">Show Article</button>' +
            '<input id="id" type="text" placeholder="Input article id" />'
        );
    });

    $('body').on('click', 'button#showArt', function() {
        getArticle($('#id').val());
    });

    $('body').on('click', 'button#addArt', function() {
        $('#advance').text('');
        $('#advance').append(
            '<button id="pushArt">Push Article</button>' +
            '<input id="title" type="text" placeholder="Title" />' +
            '<input id="author" type="text" placeholder="Author" />' +
            '<input id="description" type="text" placeholder="Description" />' +
            '<input id="thumbnail" type="text" placeholder="Thumbnail URL" />' +
            '<input id="detail" type="text" placeholder="Detail URL" />'
        );
    });

    $('body').on('click', 'button#pushArt', function() {
        addArticle(
            $('#title').val(),
            $('#author').val(),
            $('#description').val(),
            [
                {kind: 'thumbnail', url: $('#thumbnail').val()},
                {kind: 'detail', url: $('#detail').val()}
            ]
        );
    });

    $('body').on('click', 'button#editArt', function() {
        $('#advance').text('');
        $('#advance').append(
            '<button id="putArt">Put Article</button>' +
            '<input id="id" type="text" placeholder="Id" />' +
            '<input id="title" type="text" placeholder="Title" />' +
            '<input id="author" type="text" placeholder="Author" />' +
            '<input id="description" type="text" placeholder="Description" />' +
            '<input id="thumbnail" type="text" placeholder="Thumbnail URL" />' +
            '<input id="detail" type="text" placeholder="Detail URL" />'
        );
    });

    $('body').on('click', 'button#putArt', function() {
       editArticle(
           $('#id').val(),
           $('#title').val(),
           $('#author').val(),
           $('#description').val(),
           [
               {kind: 'thumbnail', url: $('#thumbnail').val()},
               {kind: 'detail', url: $('#detail').val()}
           ]
       );
    });

    $('body').on('click', 'button#getArts', function() {
        getArticles();
    });

    $('body').on('click', 'button#delArt', function() {
        $('#advance').text('');
        $('#advance').append(
            '<button id="remArt">Remove Article</button>' +
            '<input id="id" type="text" placeholder="Input article id" />'
        );
    });

    $('body').on('click', 'button#remArt', function() {
        deleteArticle($('#id').val());
    });
});

function getArticle(id) {
    var url = 'http://localhost:1337/api/articles/' + id;

    if (id == 'undefined' || id == null) {
        console.log({error: 'ID empty'});
        return false;
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        success: function(res) {
            console.log(res);
            $('#output').text('');
            $('#output').append('TITLE: ' + res.article.title + '<br>' +
                    'AUTHOR: ' + res.article.author + '<br>' +
                    'DESCRIPTION: ' + res.article.description + '<br>'
            );
            $(res.article.images).each(function(i) {
                $('#output').append('IMAGES ' +  res.article.images[i].kind.toUpperCase() + ':<br>' +
                        '<img src="' + res.article.images[i].url + '"/><br>'
                );
            });
        }
    });
}

function getArticles() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://localhost:1337/api/articles',
        success: function(res) {
            console.log(res);
            $('#output').text('');
            $.each(res, function(i) {
                $('#output').append('ID: ' + res[i]._id + '</br>');
            });
        }
    });
}

function addArticle(title, author, description, images) {
    $.ajax({
        type: 'POST',
        dataTyep: 'json',
        url: 'http://localhost:1337/api/articles',
        data: {
            title: title,
            author: author,
            description: description,
            images: images
        },
        success: function(res) {
            console.log(res);
        }
    });
}

function editArticle(id, title, author, description, images) {
    var url = 'http://localhost:1337/api/articles/' + id;

    $.ajax({
       type: 'PUT',
        dataType: 'json',
        url: url,
        data: {
            title: title,
            author: author,
            description: description,
            images: images
        },
        success: function(res) {
            console.log(res);
        }
    });
}

function deleteArticle(id) {
    var url = 'http://localhost:1337/api/articles/' + id;

    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: url,
        success: function(res) {
            console.log(res);
            $('#output').text('Article id: ' + id + ' removed');
        }
    });
}
