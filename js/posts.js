// Script for auto-generating post previews.

// Function that appends a single post preview.
function append_post(input, num) {
    $("#post-previews").append(
        '<div class="post-preview" id="post' + num.toString() + '">' +
        '<a href="post.html">' +
        '<h2 class="post-title">' +
        input.title +
        '</h2>' + '<h3 class="post-subtitle">' +
        input.subtitle +
        '</h3></a>' + ' <p class="post-meta">Posted by <a href=' +
        input.authorInfo + '>' + input.author +
        '</a> on ' + input.date + '</p>' + '</div>' + '<hr>'
    );
    $('<script>')
        .attr('type', 'text/javascript')
        .text('$("#post' + num.toString() + '").click(function() { localStorage.setItem("postSrc", "' + input.postAddress + '");});')
        .appendTo('head');
};

// Function that appends an "older posts" button.
function append_older_button(address = "#") {
    $("#post-previews").append(
        '<div class="clearfix">' +
        '<a class="btn btn-secondary float-right" href="' + address + '">Older Posts &rarr;</a>' +
        '</div>'
    );
};

//Get posts json list.
$.getJSON("posts.json", function(data) {
    for (var i = data.posts.length - 1; i > -1; i--) {
        append_post(data.posts[i], i);
    };
    append_older_button();
});