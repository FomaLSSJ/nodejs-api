var api = '/api/articles/';
var image = 'image/';
var login = '/users/login';
var register = '/users/register';

$(document).ready(function() {
    $('body').on('click', 'img', function() {
        if ($(this).hasClass('expand')) {
            $(this).removeClass('expand');
        } else {
            $(this).addClass('expand');
        }
    });

    $('body').on('click', 'button#log', function() {
        postLogin($('#username').val(), $('#password').val());
    });

    $('body').on('click', 'button#reg', function() {
        postRegister($('#username').val(), $('#password').val());
    });

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
            '<input id="title_eng" type="text" placeholder="Title english" />' +
            '<input id="title_jap" type="text" placeholder="Title japan" /><br>' +
            '<input id="pub_eng" type="text" placeholder="Publisher english" />' +
            '<input id="pub_jap" type="text" placeholder="Publisher japan" />' +
            '<input id="release" type="text" placeholder="Release" />' +
            '<input id="media" type="text" placeholder="Media" />'
        );
    });

    $('body').on('click', 'button#pushArt', function() {
        addArticle(
            [
                {kind: 'english', value: $('#title_eng').val()},
                {kind: 'japan', value: $('#title_jap').val()}
            ],
            [
                {kind: 'pub_eng', value: $('#pub_eng').val()},
                {kind: 'pub_jap', value: $('#pub_jap').val()},
                {kind: 'release', value: $('#release').val()},
                {kind: 'media', value: $('#media').val()}
            ],
            [
                {kind: 'thumbnail', url: $('#thumbnail').val()},
                {kind: 'screen', url: $('#screen').val()}
            ]
        );
    });

    $('body').on('click', 'button#addImg', function() {
        $('#advance').text('');
        $('#advance').append(
            '<input id="id" type="text" placeholder="Item id" />' +
            '<input id="url" type="text" placeholder="Image URL" /><br>' +
            '<button id="thumbnail">Put Thumbnail</button>' +
            '<button id="screen">Put Screen</button>' +
            '<button id="cover">Put Cover</button>'
        );
    });

    $('body').on('click', 'button#editArt', function() {
        $('#advance').text('');
        $('#advance').append(
            '<button id="putArt">Put Article</button>' +
            '<input id="id" type="text" placeholder="Item id" />' +
            '<input id="title_eng" type="text" placeholder="Title english" />' +
            '<input id="title_jap" type="text" placeholder="Title japan" /><br>' +
            '<input id="pub_eng" type="text" placeholder="Publisher english" />' +
            '<input id="pub_jap" type="text" placeholder="Publisher japan" />' +
            '<input id="release" type="text" placeholder="Release" />' +
            '<input id="media" type="text" placeholder="Media" /><br>'
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

    $('body').on('click', 'button#thumbnail, button#screen, button#cover', function() {
        addImage(
            $('#id').val(),
            $(this).attr('id'),
            $('#url').val()
        );
    });

    $('body').on('click', 'button#putScreen', function() {
        addImage(
            $('#id').val(),
            'screen',
            $('#url').val()
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

    $('body').on('click', 'button#cls', function() {
        $('#output').text('');
    });
});

String.prototype.letter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function sortData(json, kind) {
    if (!json.length) {
        return '';
    }

    var result = '';

    $(json).each(function(i) {
        if (json[i].url == '') {
            result += '';
        } else if (json[i].kind == kind) {
            result += '<img src="' + json[i].url + '"/>';
        }
    });

    if (result != '') {
        return '<b>' + kind.letter() + ':</b><br>' + result + '<br>';
    } else {
        return '';
    }

}

function postLogin(username, password) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: login,
        data: {
            username: username,
            password: password
        },
        success: function(res) {
            console.log(res);
            $('#output').text(res.message);
        }
    });
}

function postRegister(username, password) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: register,
        data: {
            username: username,
            password: password
        },
        success: function(res) {
            console.log(res);
            $('#output').text(res.message);
        }
    });
}

function addImage(id, kind, url) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: api + image + id,
        data: {
            kind: kind,
            url: url
        },
        success: function(res) {
            console.log(res);
            $('#url').val('');
            $('#output').text(res.message);
        }
    });
}

function getArticle(id) {
    if (id == 'undefined' || id == null) {
        console.log({error: 'ID empty'});
        return false;
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: api + id,
        success: function(res) {
            console.log(res);
            $('#output').text('');
            $('#output').append(
                    '<b>ID:</b><br>' +
                    res.article._id + '<br>' +
                    '<b>Title:</b><br>' +
                    res.article.titles[0].value + '<br>' +
                    res.article.titles[1].value + '<br>' +
                    '<b>Publisher:</b><br>' +
                    res.article.infos[0].value + '<br>' +
                    res.article.infos[1].value + '<br>' +
                    '<b>Release:</b><br>' +
                    res.article.infos[2].value + '<br>' +
                    '<b>Media:</b><br>' +
                    res.article.infos[3].value + '<br><br>' +
                    sortData(res.article.images, 'thumbnail') +
                    sortData(res.article.images, 'screen')
            );
        }
    });
}

function getArticles() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: api,
        success: function(res) {
            console.log(res);
            $('#output').text('');
            $.each(res, function(i) {
                var id = res[i]._id;
                $('#output').append('ID: <a onclick="getArticle(\'' + id + '\');">' + id + '</a></br>');
            });
        }
    });
}

function addArticle(titles, infos, images) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: api,
        data: {
            titles: titles,
            infos: infos,
            images: images
        },
        success: function(res) {
            console.log(res);
            if (res.status) {
                $('input').val('');
                $('#output').text('Article create');
            } else {
                $('#output').text(res.error);
            }
        }
    });
}

function editArticle(id, title, author, description, images) {
    $.ajax({
       type: 'PUT',
        dataType: 'json',
        url: api + id,
        data: {
            title: title,
            description: description,
            images: images
        },
        success: function(res) {
            console.log(res);
            if (res.status) {
                $('input').val('');
                $('#output').text('Article edit');
            } else {
                $('#output').text(res.error);
            }
        }
    });
}

function deleteArticle(id) {
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: api + id,
        success: function(res) {
            console.log(res);
            if (res.status) {
                $('input').val('');
                $('#output').text('Article id: ' + id + ' removed');
            } else {
                $('#output').text(res.error);
            }

        }
    });
}
