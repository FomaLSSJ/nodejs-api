function getArticle(id) {
    var url = 'http://localhost:1337/api/articles/' + id;

    if (id == 'undefined' || id == null) {
        console.log({error: 'ID empty'});
        return false;
    }

    $.ajax({
        type:'GET',
        dataType:'json',
        url:url,
        success:function(req) {
            console.log(req);
        }
    });
}

function getArticles() {
    $.ajax({
        type:'GET',
        dataType:'json',
        url:'http://localhost:1337/api/articles',
        success:function(req) {
            console.log(req);
        }
    });
}

function addArticle(title) {
    if (title == 'undefined' || title == '' || title == null) {
        console.log({error:'Title empty'});
        return false;
    }

    $.ajax({
        type:'POST',
        dataTyep:'json',
        url:'http://localhost:1337/api/articles',
        data:{
            title: 'TestArticle',
            author: 'John Doe',
            description: 'lorem ipsum dolar sit amet',
            images: [
                {"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"},
                {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}
            ]
        },
        success:function(res) {
            console.log(res);
        }
    });
}

function editArticle(id, title, author, description, images) {
    var url = 'http://localhost:1337/api/articles/' + id;

    if (id == 'undefined' || id == null ||
        title == 'undefined' || title == null ||
        author == 'undefined' || author == null ||
        description == 'undefined' || description == null ||
        images == 'undefined' || images == null || $.type(images) != 'array' ) {
        console.log({error: 'Empty field'});
        return false;
    }

    $.ajax({
       type:'PUT',
        dataType:'json',
        url:url,
        data:{
            title:title,
            author:author,
            description:description,
            images:images
        },
        success:function(res) {
            console.log(res);
        }
    });
}

function deleteArticle(id) {
    var url = 'http://localhost:1337/api/articles/' + id;

    if (id == 'undefined' || id == null) {
        console.log({error: 'ID empty'});
        return false;
    }

    $.ajax({
        type:'DELETE',
        dataType:'json',
        url:url,
        success:function(req) {
            console.log(req);
        }
    });
}
